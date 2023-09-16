import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import userReducer from './features/userSlice';
import { shazamCoreApi } from './services/shazamCore';
export const store = configureStore({
  reducer: {
    player: playerReducer,
    user:userReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(shazamCoreApi.middleware)
});
