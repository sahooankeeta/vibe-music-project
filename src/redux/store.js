import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import authReducer from "./features/authSlice";
import { shazamCoreApi } from './services/shazamCore';
export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(shazamCoreApi.middleware)
});
