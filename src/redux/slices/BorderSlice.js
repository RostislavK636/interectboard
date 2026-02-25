import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  borders: [],
  status: "loading",
};

export const fetchBoards = createAsyncThunk(
  "border/fetchBoards",
  async (params, { rejectWithValue }) => {
    try {
      const urlParams = new URLSearchParams();
      urlParams.append("l", 3);
      urlParams.append("p", params.page);
      if (params.search) {
        urlParams.append("search", params.search);
      }
      if (params.activeSort?.sortBy && params.activeSort?.order) {
        urlParams.append("sortBy", params.activeSort.sortBy);
        urlParams.append("order", params.activeSort.order);
      }
      if (params.activeFilter !== 0) {
        urlParams.append("category", params.activeFilter);
      }
      const url = `https://698e3096aded595c25314dea.mockapi.io/boards?${urlParams}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
export const borderSlice = createSlice({
  name: "border",
  initialState,
  reducers: {
    getBoard(state, action) {
      state.borders = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "ok";
        state.borders = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "error";
        state.borders = [];
        console.log("Ошибка запроса", action.payload);
      });
  },
});

export const selectBorder = (state) => state.border;

// Actions
export const { getBoard } = borderSlice.actions;

// Export
export default borderSlice.reducer;
