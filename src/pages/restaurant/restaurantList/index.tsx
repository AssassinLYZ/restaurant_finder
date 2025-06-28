import { useState } from 'react';

import { Restaurant } from 'src/shared/types/restaurants';
import { DrawerComponent } from 'src/shared/components/drawer';

import RestaurantDetail from '../restaurantDetail';
import { ListWrapper, StyledRestaurantCard } from './styled';

interface RestaurantListProps {
  currentPage?: number;
  pageSize?:number;
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants,currentPage,pageSize }: RestaurantListProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();


  const handleCardClick = (restaurant: Restaurant) => {
    setIsDrawerOpen(true);
    setSelectedRestaurant(restaurant);
  };

  return (
    <ListWrapper>
      {restaurants.map((restaurant,index) => (
        <StyledRestaurantCard
          data-testid={`restaurant-card-${((currentPage ?? 1) - 1) * (pageSize ?? 1) + index + 1}`}
          key={restaurant.id}
          restaurant={restaurant}
          onClick={() => handleCardClick(restaurant)}
        />
      ))}
      <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <RestaurantDetail  restaurant={selectedRestaurant} />
      </DrawerComponent>
    </ListWrapper>
  );
}
