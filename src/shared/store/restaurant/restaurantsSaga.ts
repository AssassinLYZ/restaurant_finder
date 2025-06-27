import { call, put, takeLatest } from 'redux-saga/effects';

import { RestaurantSearchResponse } from 'src/shared/types/restaurants';

import { getRestaurantsByPostcode } from '../../api/restaurants';
import { fetchStart, fetchSuccess, fetchFailure } from './restaurantsSlice';

export function* fetchRestaurantsSaga(action: ReturnType<typeof fetchStart>) {
  try {
    const postcode = action.payload;
    const restaurants: RestaurantSearchResponse = yield call(getRestaurantsByPostcode, postcode);
    yield put(fetchSuccess(restaurants));
  } catch (error) {
    yield put(fetchFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchFetchRestaurants() {
  // use takeLatest to cancel unfinished request
  yield takeLatest(fetchStart.type, fetchRestaurantsSaga);
}
