import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { State, UserType } from './types'

const initialState: State = {
  count: 0,
  list: [],
  error: false,
  loading: false
}

const fetchUsers = createAsyncThunk('users', async (_thunkAPI) => {
  const response = await fetch('api/users')
  const json = await response.json()
  return json as UserType[]
})

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.count = action.payload.length
      state.list = action.payload
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.error = true
    })
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
  }
})

export { fetchUsers }

export default users.reducer
