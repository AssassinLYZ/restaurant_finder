import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FILTERS, SORT_SELECT_OPTIONS } from '../../constant/restaurant';

import type { Restaurant, RestaurantSearchResponse } from '../../types/restaurants';

export type FilterType = (typeof FILTERS)[number]['id'];
export type SortOption = (typeof SORT_SELECT_OPTIONS)[number]['value'];

export interface RestaurantsState {
  postcode: string | null;
  data: Restaurant[];
  filters: {
    searchQuery: string;
    activeFilters: Record<FilterType, boolean>;
    sortBy: SortOption;
  };

  loading: boolean;
  error: AxiosError | null;
  pagination: {
    currentPage: number;
    pageSize: number;
  };
}

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
    pageSize: 18,
  },

  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    fetchStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.postcode = action.payload;
    },
    fetchSuccess(state, action: PayloadAction<RestaurantSearchResponse>) {
      state.data = action.payload.restaurants;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.error = action.payload as unknown as AxiosError;
      state.loading = false;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.filters.activeFilters = { ...initialState.filters.activeFilters };
    },
    clearAllFilters(state) {
      state.filters.activeFilters = { ...initialState.filters.activeFilters };
      state.filters.searchQuery = '';
      state.filters.sortBy = 'bestMatch';
    },
    toggleFilter(state, action: PayloadAction<FilterType>) {
      const filter = action.payload;
      state.pagination.currentPage = 1;
      state.filters.activeFilters[filter] = !state.filters.activeFilters[filter];
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      const search = action.payload;
      state.pagination.currentPage = 1;
      state.filters.searchQuery = search;
    },
    setSortOption(state, action: PayloadAction<SortOption>) {
      state.pagination.currentPage = 1;
      state.filters.sortBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setPostcode: (state, action: PayloadAction<string>) => {
      state.postcode = action.payload;
    },
  },
});

export const {
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
} = slice.actions;
export default slice.reducer;
