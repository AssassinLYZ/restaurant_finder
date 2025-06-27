import { useCallback, useMemo, useState } from 'react';
import { Map, AdvancedMarker, useMap, Pin } from '@vis.gl/react-google-maps';

import { Restaurant } from 'src/shared/types/restaurants';

import {
  ErrorContainer,
  ErrorMessage,
  MapContainer,
  AddressInfo,
  AddressInfoHeader,
  RestaurantName,
  CloseButtonWrapper,
  AddressText,
} from './styled';

interface RestaurantDetailsMapProps {
  restaurant: Restaurant;
  height?: string;
  width?: string;
}

const MAP_CONFIG = {
  streetViewControl: false,
  mapTypeControl: false,
};

const CENTER_TOLERANCE = 0.0001;

export default function RestaurantDetailsMap({
  restaurant,
  height = '400px',
  width = '100%',
}: RestaurantDetailsMapProps) {
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const map = useMap();
  const mapKey = useMemo(() => `${restaurant.id}-${Date.now()}`, [restaurant.id]);

  const center = useMemo(() => {
    const coords = restaurant.address?.location?.coordinates;
    return coords?.length === 2 ? { lat: coords[1], lng: coords[0] } : null;
  }, [restaurant.address?.location?.coordinates]);

  const onCenterChanged = useCallback(() => {
    if (!map || !center) return;

    const mapCenter = map.getCenter();
    if (!mapCenter) return;

    const isCentered =
      Math.abs(mapCenter.lat() - center.lat) < CENTER_TOLERANCE &&
      Math.abs(mapCenter.lng() - center.lng) < CENTER_TOLERANCE;

    setShowAddressInfo(isCentered);
  }, [map, center]);

  const onMarkerClick = useCallback(() => {
    if (map && center) {
      map.panTo(center);
      setShowAddressInfo(true);
    }
  }, [map, center]);

  if (!center) {
    return (
      <ErrorContainer>
        <ErrorMessage>Location information Error.</ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <MapContainer $width={width} $height={height}>
      <Map
        key={mapKey}
        defaultCenter={center}
        defaultZoom={15}
        style={{ width: '100%', height: '100%' }}
        onCenterChanged={onCenterChanged}
        {...MAP_CONFIG}
        mapId="restaurant-map"
      >
        <AdvancedMarker
          position={center}
          onClick={onMarkerClick}
          title={restaurant.name || 'Restaurant'}
        >
          <Pin />
        </AdvancedMarker>
      </Map>

      {restaurant.address && showAddressInfo && (
        <AddressInfo>
          <AddressInfoHeader>
            <RestaurantName>{restaurant.name}</RestaurantName>
            <CloseButtonWrapper onClick={() => setShowAddressInfo(false)}>x</CloseButtonWrapper>
          </AddressInfoHeader>
          <AddressText>
            {[restaurant.address.firstLine, restaurant.address.city, restaurant.address.postalCode]
              .filter(Boolean)
              .join(', ')}
          </AddressText>
        </AddressInfo>
      )}
    </MapContainer>
  );
}
