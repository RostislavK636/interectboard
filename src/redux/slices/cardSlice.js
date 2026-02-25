import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  items: [],
};

// Slice
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    createItems(state) {
      state.items = [];
    },
  },
});

export const selectCard = (state) => state.card;

// Actions
export const { addItem, removeItems, createItems } = cardSlice.actions;

// Export
export default cardSlice.reducer;
