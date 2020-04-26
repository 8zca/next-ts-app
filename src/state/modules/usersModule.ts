import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fetch from 'isomorphic-unfetch'

export type UserType = {
  id: number
  name: string
}

type State = {
  count: number
  list: UserType[]
  error: boolean
  loading: boolean
}

const initialState: State = {
  count: 0,
  list: [],
  error: false,
  loading: false
}

const fetchUsers = createAsyncThunk(
  'users',
  async (_thunkAPI) => {
    const response = await fetch('api/users')
    const json = await response.json()
    return json as UserType[]
  }
)

const usersModule = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.count = action.payload.length
      state.list = action.payload
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, state => {
      state.error = true
    })
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
  }
})

export { fetchUsers }

export default usersModule
