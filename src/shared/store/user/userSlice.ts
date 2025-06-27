import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Restaurant } from 'src/shared/types/restaurants';

interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  collectedRestaurants: Record<string, Restaurant[]>;
}

const loadInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user');
      const collected = localStorage.getItem('collectedRestaurants');
      return {
        user: user ? JSON.parse(user) : null,
        isAuthenticated: !!user,
        collectedRestaurants: collected ? JSON.parse(collected) : {},
      };
    } catch (error) {
      console.error('Failed to parse stored data', error);
      return {
        user: null,
        isAuthenticated: false,
        collectedRestaurants: {},
      };
    }
  }
  return {
    user: null,
    isAuthenticated: false,
    collectedRestaurants: {},
  };
};

const initialState: AuthState = loadInitialState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    collectNewRestaurant: (
      state,
      action: PayloadAction<{ postcode: string; restaurant: Restaurant }>
    ) => {
      const { postcode, restaurant } = action.payload;

      if (!state.collectedRestaurants[postcode]) {
        state.collectedRestaurants[postcode] = [];
      }

      const isAlreadyCollected = state.collectedRestaurants[postcode].some(
        (r) => r.id === restaurant.id
      );

      if (!isAlreadyCollected) {
        state.collectedRestaurants[postcode].push(restaurant);

        if (typeof window !== 'undefined') {
          localStorage.setItem('collectedRestaurants', JSON.stringify(state.collectedRestaurants));
        }
      }
    },

    uncollectRestaurant: (
      state,
      action: PayloadAction<{ postcode: string; restaurantId: string }>
    ) => {
      const { postcode, restaurantId } = action.payload;

      if (state.collectedRestaurants[postcode]) {
        state.collectedRestaurants[postcode] = state.collectedRestaurants[postcode].filter(
          (restaurant) => restaurant.id !== restaurantId
        );

        if (typeof window !== 'undefined') {
          localStorage.setItem('collectedRestaurants', JSON.stringify(state.collectedRestaurants));
        }
      }
    },
  },
});

export const { login, logout, collectNewRestaurant, uncollectRestaurant } = userSlice.actions;
export default userSlice.reducer;
