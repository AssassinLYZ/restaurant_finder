import { createSelector } from '@reduxjs/toolkit';

import { Restaurant } from 'src/shared/types/restaurants';

import { FilterType } from './restaurantsSlice';

import type { RootState } from '../store';

const selectRawData = (state: RootState) => state.restaurants.data;
const selectFilters = (state: RootState) => state.restaurants.filters;
const selectPagination = (state: RootState) => state.restaurants.pagination;
export const selectFilteredRestaurants = createSelector(
  [selectRawData, selectFilters],
  (data, filters) => {
    // title filter
    const textFiltered = data?.filter((restaurant: Restaurant) =>
      restaurant.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );

    // mutli filter
    const activeFilterIds = Object.entries(filters.activeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([id]) => id as FilterType);

    const filtered =
      activeFilterIds.length > 0
        ? textFiltered.filter((restaurant: Restaurant) => {
          return activeFilterIds.every((filterId) => {
            switch (filterId) {
              case 'with_discounts':
                return restaurant.deals.length == 0;
              case 'free_delivery':
                return restaurant.deliveryCost == 0;
              case 'four_star':
                return restaurant.rating.starRating >= 4;
              case 'open_now':
                return restaurant.isOpenNowForDelivery;
              case 'collection':
                return restaurant.isCollection;
              case 'new':
                return restaurant.isNew;
              default:
                return true;
            }
          });
        })
        : textFiltered;
    if (!filtered) return []
    // sroting
    return [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'bestMatch':
          return 0;
        case 'reviews':
          return (b.rating.starRating ?? 0) - (a.rating.starRating ?? 0);
        case 'estimatedDeliveryTime':
          return (
            (a.deliveryEtaMinutes?.rangeLower ?? Infinity) -
            (b.deliveryEtaMinutes?.rangeLower ?? Infinity)
          );
        case 'minOrderAmount':
          return (a.minimumDeliveryValue ?? 0) - (b.minimumDeliveryValue ?? 0);
        case 'deliveryCost':
          return (a.deliveryCost ?? 0) - (b.deliveryCost ?? 0);
        default:
          return 0;
      }
    });
  }
);

export const selectPaginatedRestaurants = createSelector(
  [selectFilteredRestaurants, selectPagination],
  (filtered, pagination) => {
    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }
);
export const selectPaginationMeta = createSelector(
  [selectFilteredRestaurants, selectPagination],
  (filtered, pagination) => ({
    totalItems: filtered.length,
    totalPages: Math.ceil(filtered.length / pagination.pageSize),
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  })
);
