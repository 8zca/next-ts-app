import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from './types'

const counterModule = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state: State, _action: PayloadAction<void>) => state + 1,
    decrement: (state: State, _action: PayloadAction<void>) => state - 1
  }
})

export const { increment, decrement } = counterModule.actions

export default counterModule
