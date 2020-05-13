import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from './types'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state: State, _action: PayloadAction<void>) => state + 1,
    decrement: (state: State, _action: PayloadAction<void>) => state - 1
  }
})

export const { increment, decrement } = counter.actions

export default counter.reducer
