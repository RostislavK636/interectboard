import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cardSlice from "./slices/cardSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    card: cardSlice,
  },
});
