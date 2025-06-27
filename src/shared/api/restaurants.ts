import http from 'src/shared/axios';

import { RestaurantSearchResponse } from '../types/restaurants';

export const getRestaurantsByPostcode = async (
  postcode: string
): Promise<RestaurantSearchResponse> => {
  const response = await http.get(`/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
  return response.data;
};

export const restaurantRequest = {
  getRestaurantsByPostcode,
};
