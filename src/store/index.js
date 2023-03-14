import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/authSlice";
import UsersReducer from "./slices/usersSlice";
import ReportReducer from "./slices/reportSlice";

const reducers = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  report: ReportReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
