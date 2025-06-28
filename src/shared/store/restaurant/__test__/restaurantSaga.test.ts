import { call, put, takeLatest } from 'redux-saga/effects';

import { getRestaurantsByPostcode } from 'src/shared/api/restaurants';
import { RestaurantSearchResponse } from 'src/shared/types/restaurants';
import * as mockRestaurantsResponse from 'src/shared/__mock__/restaurantMock.json';

import { fetchStart, fetchSuccess, fetchFailure } from '../restaurantsSlice';
import { watchFetchRestaurants, fetchRestaurantsSaga } from '../restaurantsSaga';

jest.mock('src/shared/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: { restaurants: [] } })),
  },
}));

describe('Restaurants Sagas', () => {
  describe('fetchRestaurantsSaga', () => {
    const mockPostcode = 'SW1A1AA';
    const mockAction = fetchStart(mockPostcode);

    it('should handle successful API call', () => {
      const generator = fetchRestaurantsSaga(mockAction);

      // Step 1: Should call the API with postcode
      expect(generator.next().value).toEqual(call(getRestaurantsByPostcode, mockPostcode));

      // Step 2: Should dispatch success action with response
      expect(generator.next(mockRestaurantsResponse as unknown as RestaurantSearchResponse ).value).toEqual(
        put(fetchSuccess(mockRestaurantsResponse as unknown as RestaurantSearchResponse ))
      );

      // Saga should be done
      expect(generator.next().done).toBe(true);
    });

    it('should handle API errors', () => {
      const generator = fetchRestaurantsSaga(mockAction);
      const mockError = new Error('API Error');

      // Advance to API call
      generator.next();

      // Trigger error and check failure action
      expect(generator.throw(mockError).value).toEqual(put(fetchFailure('API Error')));

      // Saga should be done
      expect(generator.next().done).toBe(true);
    });

    it('should handle non-Error exceptions', () => {
      const generator = fetchRestaurantsSaga(mockAction);

      // Advance to API call
      generator.next();

      // Trigger string error
      expect(generator.throw('Server crashed').value).toEqual(put(fetchFailure('Unknown error')));
    });
  });

  describe('watchFetchRestaurants', () => {
    it('should take latest fetchStart action', () => {
      const generator = watchFetchRestaurants();

      expect(generator.next().value).toEqual(takeLatest(fetchStart.type, fetchRestaurantsSaga));
    });
  });
});
