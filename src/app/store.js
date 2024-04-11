import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from "../redux/products";

export const store = configureStore({
  reducer: teamsReducer,
});
