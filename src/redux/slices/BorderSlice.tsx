import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Board } from "../../types";

interface fetchBoardParams {
  page: number;
  search: string;
  activeSort: {
    sortBy: string;
    order: "asc" | "desc";
    label: string;
  };
  activeFilter: number;
}

interface BorderState {
  borders: Board[];
  status: "idle" | "loading" | "ok" | "error";
  error?: string | null;
}

// Initial State
const initialState: BorderState = {
  borders: [],
  status: "loading",
};

export const fetchBoards = createAsyncThunk<Board[], fetchBoardParams>(
  "border/fetchBoards",
  async (params, { rejectWithValue }) => {
    try {
      const urlParams = new URLSearchParams();
      urlParams.append("l", "3");
      urlParams.append("p", String(params.page));
      if (params.search) {
        urlParams.append("search", params.search);
      }
      if (params.activeSort?.sortBy && params.activeSort?.order) {
        urlParams.append("sortBy", params.activeSort.sortBy);
        urlParams.append("order", params.activeSort.order);
      }
      if (params.activeFilter !== 0) {
        urlParams.append("category", String(params.activeFilter));
      }
      const url = `https://698e3096aded595c25314dea.mockapi.io/boards?${urlParams}`;

      const response = await axios.get<Board[]>(url); // ✅ Типизируем response

      return response.data;
    } catch (error) {
      return rejectWithValue("Произошла ошибка");
    }
  },
);

// Slice
export const borderSlice = createSlice({
  name: "border",
  initialState,
  reducers: {
    getBoard(state, action: PayloadAction<Board[]>) {
      state.borders = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.status = "ok";
          state.borders = action.payload;
        },
      )
      .addCase(fetchBoards.rejected, (state) => {
        state.status = "error";
        state.borders = [];
        console.log("Ошибка запроса");
      });
  },
});

export const selectBorder = (state: { border: BorderState }) => state.border;

// Actions
export const { getBoard } = borderSlice.actions;

// Export
export default borderSlice.reducer;
