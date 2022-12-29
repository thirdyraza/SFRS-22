import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import reserveReducer from '../features/reserves/reserveSlice';
import notifReducer from '../features/notifs/notifSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reserves: reserveReducer,
    notif: notifReducer,
  },
});
