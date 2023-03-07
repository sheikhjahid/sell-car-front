import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/authSlice";

const reducers = combineReducers({
  auth: AuthReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
