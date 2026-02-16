import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
  activeFilter: 0,
  page: 1,
  activeSort: {
    sortBy: 'createdAt',
    order: 'asc',
    label: 'возрастанию даты'
  }
}

// Slice
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload
    },

    setActiveSort(state, action) {
      state.activeSort = action.payload
    },

    setPage(state,action) {
      state.page = action.payload
    }
  },
})

// Actions
export const { 
  setActiveFilter,
  setActiveSort,
  setPage
} = filterSlice.actions

// Export
export default filterSlice.reducer
