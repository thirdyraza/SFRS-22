import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import reserveReducer from '../features/reserves/reserveSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    reserves: reserveReducer,
  },
});
