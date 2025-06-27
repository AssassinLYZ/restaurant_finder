import { KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/store/store';
import { Restaurant } from 'src/shared/types/restaurants';
import  TextHighlighter from 'src/shared/components/textHighlighter';

import {
  CardContainer,
  LogoContainer,
  Logo,
  Content,
  Title,
  DetailItem,
  Details,
  InfoPair,
  Rating,
  RatingCount,
  RatingValue,
  StarIcon,
  Cuisine,
  Cuisines,
} from './styled';

interface RestaurantCardProps {
  readonly restaurant: Restaurant;
  readonly className?: string;
  readonly onClick?: () => void;
}

export default function RestaurantCard({
  restaurant,
  onClick,
  className = '',
}: Readonly<RestaurantCardProps>) {
  const handleClick = () => {
    onClick?.();
  };
  const filters = useSelector((state: RootState) => state.restaurants.filters);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log(restaurant);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const formatDeliveryTime = () => {
    const { rangeLower, rangeUpper } = restaurant.deliveryEtaMinutes || {};
    return `${rangeLower || 0}-${rangeUpper || 0} min`;
  };

  const formatDeliveryFee = () => {
    return restaurant.deliveryCost === 0
      ? 'Free delivery'
      : `€${restaurant.deliveryCost?.toFixed(2)} Delivery`;
  };

  const formatMinOrder = () => {
    return restaurant.minimumDeliveryValue === 0
      ? 'No min order'
      : `€${restaurant.minimumDeliveryValue?.toFixed(2)}`;
  };

  return (
    <>
      <CardContainer
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={className}
        tabIndex={0}
        role="button"
      >
        <LogoContainer>
          <Logo src={restaurant.logoUrl} alt={`${restaurant.name} logo`} loading="lazy" />
        </LogoContainer>

        <Content>
          <Title>
            {' '}
            <TextHighlighter content={restaurant.name} searchTerm={filters.searchQuery} />{' '}
          </Title>

          <InfoPair>
            <Rating>
              <StarIcon>★</StarIcon>
              <RatingValue>{restaurant.rating?.starRating?.toFixed(1)}</RatingValue>
              <RatingCount>({restaurant.rating?.count}+)</RatingCount>
            </Rating>
            <Cuisines>
              {restaurant.cuisines &&
                restaurant.cuisines?.map((item, index) => (
                  <Cuisine key={`${item.name}-${index}`}>{item.name}</Cuisine>
                ))}
            </Cuisines>
          </InfoPair>

          <Details>
            {restaurant.deliveryEtaMinutes && <DetailItem>⏰ {formatDeliveryTime()}</DetailItem>}
            {restaurant.deliveryCost !== null && (
              <DetailItem $highlight={restaurant.deliveryCost === 0}>
                📦 {formatDeliveryFee()}
              </DetailItem>
            )}
            {restaurant.minimumDeliveryValue !== null && (
              <DetailItem $highlight={restaurant.minimumDeliveryValue === 0}>
                💶 {formatMinOrder()}
              </DetailItem>
            )}
          </Details>
        </Content>
      </CardContainer>
    </>
  );
}
