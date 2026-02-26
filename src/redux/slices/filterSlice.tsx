import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  activeFilter: number;
  page: number;
  activeSort: {
    sortBy: string;
    order: "asc" | "desc";
    label: string;
  };
  search: string;
}

// Initial State
const initialState: FilterState = {
  activeFilter: 0,
  page: 1,
  activeSort: {
    sortBy: "createdAt",
    order: "asc",
    label: "возрастанию даты",
  },
  search: "",
};

// Slice
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },

    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      state.page = parseInt(action.payload.page) || 1;
      state.activeFilter = parseInt(action.payload.activeFilter) || 0;
      
      // Валидируем order - принимаем только 'asc' или 'desc'
      const order = action.payload.order === 'desc' ? 'desc' : 'asc';
      
      state.activeSort = {
        sortBy: action.payload.sortBy || "createdAt",
        order: order,
        label: action.payload.label || "возрастанию даты",
      };
      state.search = action.payload.search || "";
    },
  },
});

export const selectFilter = (state: { filter: FilterState }) => state.filter;

// Actions
export const {
  setActiveFilter,
  setActiveSort,
  setPage,
  setFilters,
  setSearch,
} = filterSlice.actions;

// Export
export default filterSlice.reducer;
