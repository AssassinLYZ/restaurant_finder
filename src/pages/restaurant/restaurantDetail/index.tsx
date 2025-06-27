import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/store/store';
import { Restaurant } from 'src/shared/types/restaurants';
import { uncollectRestaurant, collectNewRestaurant } from 'src/shared/store/user/userSlice';

import RestaurantDetailsMap from '../restaurantDetailsMap';
import {
  MapSection,
  Header,
  Logo,
  Info,
  Rating,
  Stars,
  ReviewCount,
  Cuisines,
  CuisineTag,
  Details,
  Section,
  SectionTitle,
  Address,
  DeliveryInfo,
  DeliveryItem,
  Label,
  Value,
  Name,
  CollectButton,
  Title,
} from './styled';

interface RestaurantDetailProps {
  restaurant: Restaurant | undefined;
}

export default function RestaurantDetail({ restaurant }:RestaurantDetailProps)  {
  const dispatch = useDispatch();
  const { collectedRestaurants, isAuthenticated } = useSelector((state: RootState) => state.user);
  const { postcode } = useSelector((state: RootState) => state.restaurants);

  const restaurantPostcode = useMemo(() => {
    if (!restaurant) return postcode;

    for (const [currentPostcode, restaurants] of Object.entries(collectedRestaurants)) {
      if (restaurants.some((r) => r.id === restaurant.id)) {
        return currentPostcode;
      }
    }
    return postcode;
  }, [restaurant]);

  const isCollected = useMemo(() => {
    return restaurant
      ? Object.values(collectedRestaurants).some((restaurantList) =>
          restaurantList.some((r) => r.id === restaurant.id)
        ) && isAuthenticated
      : false;
  }, [collectedRestaurants, restaurant]);

  const handleCollectClick = () => {
    if (!restaurant || !restaurantPostcode) return;
    if (!isAuthenticated) {
      alert('You need to login first');
      return;
    }
    if (isCollected) {
      dispatch(
        uncollectRestaurant({
          postcode: restaurantPostcode,
          restaurantId: restaurant.id,
        })
      );
    } else {
      dispatch(
        collectNewRestaurant({
          postcode: restaurantPostcode,
          restaurant,
        })
      );
    }
  };

  if (!restaurant) return null;

  return (
    <>
      <Title>
        <Name>{restaurant.name || 'Restaurant'}</Name>
        <CollectButton
          onClick={handleCollectClick}
          aria-label={isCollected ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isCollected ? '❤️' : '♡'}
        </CollectButton>
      </Title>

      <Header>
        {restaurant.logoUrl && (
          <Logo src={restaurant.logoUrl} alt={restaurant.name || 'Restaurant'} loading="lazy" />
        )}
        <Info>
          {restaurant.rating && (
            <Rating>
              <Stars>★ {restaurant.rating.starRating || 0}</Stars>
              <ReviewCount>({restaurant.rating.count || 0} reviews)</ReviewCount>
            </Rating>
          )}
          {restaurant.cuisines?.length > 0 && (
            <Cuisines>
              {restaurant.cuisines.map((cuisine, index) => (
                <CuisineTag key={`${cuisine.name}-${index}`}>{cuisine.name}</CuisineTag>
              ))}
            </Cuisines>
          )}
        </Info>
      </Header>

      <MapSection>
        <RestaurantDetailsMap restaurant={restaurant} height="300px" />
      </MapSection>

      <Details>
        {restaurant.address && (
          <Section>
            <SectionTitle>Address</SectionTitle>
            <Address>
              {restaurant.address.firstLine}
              <br />
              {restaurant.address.city}, {restaurant.address.postalCode}
            </Address>
          </Section>
        )}

        <Section>
          <SectionTitle>Delivery Information</SectionTitle>
          <DeliveryInfo>
            {restaurant.deliveryEtaMinutes && (
              <DeliveryItem>
                <Label>Delivery Time:</Label>
                <Value>
                  {restaurant.deliveryEtaMinutes.rangeLower}-
                  {restaurant.deliveryEtaMinutes.rangeUpper} minutes
                </Value>
              </DeliveryItem>
            )}
            {typeof restaurant.deliveryCost === 'number' && (
              <DeliveryItem>
                <Label>Delivery Cost:</Label>
                <Value>£{restaurant.deliveryCost.toFixed(2)}</Value>
              </DeliveryItem>
            )}
          </DeliveryInfo>
        </Section>
      </Details>
    </>
  );
};
