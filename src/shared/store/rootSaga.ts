import { all } from 'redux-saga/effects';

import { watchFetchRestaurants } from './restaurant/restaurantsSaga';

export default function* rootSaga() {
  yield all([watchFetchRestaurants()]);
}
