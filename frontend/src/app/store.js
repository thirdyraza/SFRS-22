import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import reserveReducer from '../features/reserves/reserveSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reserves: reserveReducer,
  },
});
