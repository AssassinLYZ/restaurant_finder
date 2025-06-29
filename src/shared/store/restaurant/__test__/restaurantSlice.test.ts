import { AxiosError } from 'axios';

import { RestaurantSearchResponse } from 'src/shared/types/restaurants';
import * as mockData from 'src/shared/__mock__/restaurantMock.json';

import restaurantsReducer, {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setSearchQuery,
  toggleFilter,
  setSortOption,
  resetFilters,
  setCurrentPage,
  setSearchFilter,
  clearAllFilters,
  setPostcode,
  RestaurantsState,
} from '../restaurantsSlice';
import { PAGE_SIZE } from 'src/shared/constant/restaurant';

describe('restaurants slice', () => {
  const initialState: RestaurantsState = {
    postcode: null,
    data: [],
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
      pageSize: PAGE_SIZE,
    },
    loading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(restaurantsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetch actions', () => {
    it('should handle fetchStart', () => {
      const postcode = 'SW1A 1AA';
      const action = fetchStart(postcode);
      const state = restaurantsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.postcode).toBe(postcode);
    });

    it('should handle fetchSuccess', () => {
      const action = fetchSuccess(mockData.mockRestaurantsResponse as unknown as RestaurantSearchResponse);
      const state = restaurantsReducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.data).toEqual((mockData.mockRestaurantsResponse as unknown as RestaurantSearchResponse).restaurants);
    });

    it('should handle fetchFailure', () => {
      const error = 'Network error';
      const action = fetchFailure(error);
      const state = restaurantsReducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.error).toEqual(error as unknown as AxiosError);
    });
  });

  describe('filter actions', () => {
    it('should handle setSearchQuery', () => {
      const query = 'pizza';
      const action = setSearchQuery(query);
      const state = restaurantsReducer(initialState, action);

      expect(state.filters.searchQuery).toBe(query);
    });

    it('should handle toggleFilter', () => {
      const filter = 'free_delivery';
      const action = toggleFilter(filter);

      // First toggle - should set to true
      let state = restaurantsReducer(initialState, action);
      expect(state.filters.activeFilters.free_delivery).toBe(true);
      expect(state.pagination.currentPage).toBe(1);

      // Second toggle - should set back to false
      state = restaurantsReducer(state, action);
      expect(state.filters.activeFilters.free_delivery).toBe(false);
    });

    it('should handle setSortOption', () => {
      const sortOption = 'reviews';
      const action = setSortOption(sortOption);
      const state = restaurantsReducer(initialState, action);

      expect(state.filters.sortBy).toBe(sortOption);
      expect(state.pagination.currentPage).toBe(1);
    });

    it('should handle resetFilters', () => {
      const modifiedState = {
        ...initialState,
        filters: {
          ...initialState.filters,
          activeFilters: {
            ...initialState.filters.activeFilters,
            free_delivery: true,
            open_now: true,
          },
        },
      };

      const action = resetFilters();
      const state = restaurantsReducer(modifiedState, action);

      expect(state.filters.activeFilters).toEqual(initialState.filters.activeFilters);
    });

    it('should handle clearAllFilters', () => {
      const modifiedState = {
        ...initialState,
        filters: {
          searchQuery: 'pizza',
          activeFilters: {
            ...initialState.filters.activeFilters,
            free_delivery: true,
            open_now: true,
          },
          sortBy: 'reviews' as 'reviews',
        },
      };

      const action = clearAllFilters();
      const state = restaurantsReducer(modifiedState, action);

      expect(state.filters).toEqual(initialState.filters);
    });

    it('should handle setSearchFilter', () => {
      const search = 'burger';
      const action = setSearchFilter(search);
      const state = restaurantsReducer(initialState, action);

      expect(state.filters.searchQuery).toBe(search);
      expect(state.pagination.currentPage).toBe(1);
    });
  });

  describe('pagination actions', () => {
    it('should handle setCurrentPage', () => {
      const page = 3;
      const action = setCurrentPage(page);
      const state = restaurantsReducer(initialState, action);
      expect(state.pagination.currentPage).toBe(page);
    });
  });

  describe('postcode actions', () => {
    it('should handle setPostcode', () => {
      const postcode = 'EC1A 1BB';
      const action = setPostcode(postcode);
      const state = restaurantsReducer(initialState, action);

      expect(state.postcode).toBe(postcode);
    });
  });
});
