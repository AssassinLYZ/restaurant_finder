import { mockRestaurantsResponse } from 'src/shared/__mock__/restaurantMock';

import { RootState } from '../../store';
import {
  selectFilteredRestaurants,
  selectPaginatedRestaurants,
  selectPaginationMeta,
} from '../selector';

describe('restaurants selectors', () => {
  const initialState: RootState = {
    restaurants: {
      data: mockRestaurantsResponse.restaurants,
      filters: {
        searchQuery: '',
        activeFilters: {
          with_discounts: false,
          free_delivery: false,
          four_star: false,
          open_now: false,
          collection: false,
          new: false,
        },
        sortBy: 'bestMatch',
      },
      pagination: {
        currentPage: 1,
        pageSize: 2,
      },
      loading: false,
      error: null,
      postcode: null,
    },
    // ... other slices
  };

  describe('selectFilteredRestaurants', () => {
    it('should return all restaurants when no filters applied', () => {
      const result = selectFilteredRestaurants(initialState);
      expect(result).toEqual(mockRestaurantsResponse.restaurants);
    });

    it('should filter by search query', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            searchQuery: 'pizza',
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Pizza Palace');
    });

    it('should filter by active filters', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            activeFilters: {
              ...initialState.restaurants.filters.activeFilters,
              four_star: true,
              new: true,
            },
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result.length).toBe(1);
      expect(result[0].rating.starRating).toBeGreaterThanOrEqual(4);
    });

    it('should sort by delivery time', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            sortBy: 'estimatedDeliveryTime' as 'estimatedDeliveryTime',
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result[0].deliveryEtaMinutes.rangeLower).toBeLessThanOrEqual(
        result[1].deliveryEtaMinutes.rangeLower
      );
    });

    it('should combine multiple filters', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            searchQuery: 'sushi',
            activeFilters: {
              ...initialState.restaurants.filters.activeFilters,
              new: true,
            },
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Sushi Express');
      expect(result[0].isNew).toBe(true);
    });
  });

  describe('selectPaginatedRestaurants', () => {
    it('should return paginated results', () => {
      const result = selectPaginatedRestaurants(initialState);
      expect(result.length).toBe(2); // pageSize is 2 in initialState
    });

    it('should return correct page', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          pagination: {
            currentPage: 2,
            pageSize: 1,
          },
        },
      };
      const result = selectPaginatedRestaurants(state);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Sushi Express');
    });
  });

  describe('selectPaginationMeta', () => {
    it('should return correct pagination metadata', () => {
      const result = selectPaginationMeta(initialState);
      expect(result).toEqual({
        totalItems: 2,
        totalPages: 1,
        currentPage: 1,
        pageSize: 2,
      });
    });

    it('should calculate correct total pages', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          pagination: {
            currentPage: 1,
            pageSize: 1,
          },
        },
      };
      const result = selectPaginationMeta(state);
      expect(result.totalPages).toBe(2);
    });
  });
});
