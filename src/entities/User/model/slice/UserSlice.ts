import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'entities/User';
import { USER_LS_KEY } from 'shared/consts/localStorage';
import type { UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<UserType>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LS_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    logout: (state) => {
      const user = localStorage.getItem(USER_LS_KEY);
      if (user) {
        state.authData = null;
        localStorage.removeItem(USER_LS_KEY);
      }
    },
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
} = userSlice;
