import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../types";

// Тип состояния
interface CardState {
  items: Board[];
}

// Initial State
const initialState: CardState = {
  items: [],
};

// Slice
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Board>) {
      state.items.push(action.payload);
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    createItems(state) {
      state.items = [];
    },
  },
});

export const selectCard = (state: { card: CardState }): CardState => state.card;

// Actions
export const { addItem, removeItems, createItems } = cardSlice.actions;

// Export
export default cardSlice.reducer;
