import { Restaurant } from 'src/shared/types/restaurants';
import * as mockdata from 'src/shared/__mock__/restaurantMock.json';
import { RootState } from '../../store';
import {
  selectFilteredRestaurants,
  selectPaginatedRestaurants,
  selectPaginationMeta,
} from '../selector';

describe('restaurants selectors', () => {
  const initialState: RootState = {
    user: {
      isAuthenticated: false,
      collectedRestaurants: {},
      user: { email: '', password: '' }
    },
    restaurants: {
      data: mockdata.mockRestaurantsResponse.restaurants as unknown as Restaurant[],
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
  };

  describe('when data is empty', () => {
    it('should return empty array when no restaurants data', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          data: [],
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result).toEqual([]);
    });
  });

  describe('selectFilteredRestaurants', () => {
    it('should return all restaurants when no filters applied', () => {
      const result = selectFilteredRestaurants(initialState);
      expect(result).toEqual(mockdata.mockRestaurantsResponse.restaurants);
    });

    it('should filter by search query (case insensitive)', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            searchQuery: 'PIZZA',
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result.length).toBe(1);
      expect(result[0].name.toLowerCase()).toContain('pizza');
    });

    it('should return all restaurants when search query is empty', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            searchQuery: '',
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result.length).toBe(mockdata.mockRestaurantsResponse.restaurants.length);
    });


    it('should return empty array when no matches found', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          filters: {
            ...initialState.restaurants.filters,
            searchQuery: 'nonexistent',
          },
        },
      };
      const result = selectFilteredRestaurants(state);
      expect(result).toEqual([]);
    });

    const testCases = [
      { filter: 'with_discounts', expected: (r: Restaurant) => r.deals.length === 0 },
      { filter: 'free_delivery', expected: (r: Restaurant) => r.deliveryCost === 0 },
      { filter: 'four_star', expected: (r: Restaurant) => r.rating.starRating >= 4 },
      { filter: 'open_now', expected: (r: Restaurant) => r.isOpenNowForDelivery },
      { filter: 'collection', expected: (r: Restaurant) => r.isCollection },
      { filter: 'new', expected: (r: Restaurant) => r.isNew },
    ];

    testCases.forEach(({ filter, expected }) => {
      it(`should filter by ${filter}`, () => {
        const activeFilters = {
          ...initialState.restaurants.filters.activeFilters,
          [filter]: true,
        };

        const state = {
          ...initialState,
          restaurants: {
            ...initialState.restaurants,
            filters: {
              ...initialState.restaurants.filters,
              activeFilters,
            },
          },
        };

        const result = selectFilteredRestaurants(state);
        expect(result.every(expected)).toBeTruthy();
      });
    });

    const sortTestCases = [
      { sortBy: 'bestMatch', comparator: () => 0 },
      {
        sortBy: 'reviews',
        comparator: (a: Restaurant, b: Restaurant) =>
          (b.rating.starRating ?? 0) - (a.rating.starRating ?? 0)
      },
      {
        sortBy: 'estimatedDeliveryTime',
        comparator: (a: Restaurant, b: Restaurant) =>
          (a.deliveryEtaMinutes?.rangeLower ?? Infinity) -
          (b.deliveryEtaMinutes?.rangeLower ?? Infinity)
      },
      {
        sortBy: 'minOrderAmount',
        comparator: (a: Restaurant, b: Restaurant) =>
          (a.minimumDeliveryValue ?? 0) - (b.minimumDeliveryValue ?? 0)
      },
      {
        sortBy: 'deliveryCost',
        comparator: (a: Restaurant, b: Restaurant) =>
          (a.deliveryCost ?? 0) - (b.deliveryCost ?? 0)
      },
    ];

    sortTestCases.forEach(({ sortBy, comparator }) => {
      it(`should sort by ${sortBy}`, () => {
        const state = {
          ...initialState,
          restaurants: {
            ...initialState.restaurants,
            filters: {
              ...initialState.restaurants.filters,
              sortBy: sortBy as any,
            },
          },
        };

        const result = selectFilteredRestaurants(state);
        for (let i = 0; i < result.length - 1; i++) {
          const comparison = comparator(result[i], result[i + 1]);
          expect(comparison).toBeLessThanOrEqual(0);
        }
      });
    });


  });

  describe('selectPaginatedRestaurants', () => {
    it('should return paginated results', () => {
      const result = selectPaginatedRestaurants(initialState);
      expect(result.length).toBe(2);
    });

    it('should return empty array when page is out of range', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          pagination: {
            currentPage: 999,
            pageSize: 2,
          },
        },
      };
      const result = selectPaginatedRestaurants(state);
      expect(result).toEqual([]);
    });

    it('should respect different page sizes', () => {
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
      const result = selectPaginatedRestaurants(state);
      expect(result.length).toBe(1);
    });
  });

  describe('selectPaginationMeta', () => {
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
    it('should return correct metadata for empty dataset', () => {
      const state = {
        ...initialState,
        restaurants: {
          ...initialState.restaurants,
          data: [],
        },
      };
      const result = selectPaginationMeta(state);
      expect(result).toEqual({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 2,
      });
    });

  });
});