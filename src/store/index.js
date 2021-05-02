import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import testSlice from "./testSlice";
import authReducer from "../redux/reducers/auth";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  testSlice,
  authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
