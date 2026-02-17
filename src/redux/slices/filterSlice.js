import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
  activeFilter: 0,
  page: 1,
  activeSort: {
    sortBy: 'createdAt',
    order: 'asc',
    label: 'возрастанию даты'
  },
  search: ''
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
    },
    setSearch(state,action) {
      state.search = action.payload
    },
    setFilters(state, action){
      state.page = parseInt(action.payload.page) || 1
      state.activeFilter = parseInt(action.payload.activeFilter) || 0
      state.activeSort = {
        sortBy: action.payload.sortBy || 'createdAt',
        order: action.payload.order || 'asc',
        label: action.payload.label || 'возрастанию даты'
      }
      state.search = action.payload.search || ''
    }
  },
})

// Actions
export const { 
  setActiveFilter,
  setActiveSort,
  setPage,
  setFilters,
  setSearch
} = filterSlice.actions

// Export
export default filterSlice.reducer
