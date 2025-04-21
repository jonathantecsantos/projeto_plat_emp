import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export namespace TableState {
  export interface Pagination {
    rowsPerPage: number,
    currentPage?: number,
  }

  export interface State {
    [user: number]: {
      [route: string]: Pagination
    }
  }
}

const initialState: TableState.State = {}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRowsPerPage: (state, action: PayloadAction<{ userId: number, route: string, rowsPerPage: number }>) => {
      if (!state[action.payload.userId]) {
        state[action.payload.userId] = {}
      }
      if (!state[action.payload.userId][action.payload.route]) {
        state[action.payload.userId][action.payload.route] = { rowsPerPage: action.payload.rowsPerPage, currentPage: 0 }
      } else {
        state[action.payload.userId][action.payload.route].rowsPerPage = action.payload.rowsPerPage
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ userId: number, route: string, currentPage: number }>) => {
      if (!state[action.payload.userId]) {
        state[action.payload.userId] = {}
      }
      if (!state[action.payload.userId][action.payload.route]) {
        state[action.payload.userId][action.payload.route] = { rowsPerPage: 10, currentPage: action.payload.currentPage }
      } else {
        state[action.payload.userId][action.payload.route].currentPage = action.payload.currentPage
      }
    },
  },
})

export const { setRowsPerPage, setCurrentPage } = tableSlice.actions

export default tableSlice.reducer


