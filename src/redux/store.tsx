import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cardSlice from "./slices/cardSlice";
import borderSlice from "./slices/BorderSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    card: cardSlice,
    border: borderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
