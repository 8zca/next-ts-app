import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State, TodoType } from './types'

const initialState: State = {
  count: 1,
  todos: [
    {
      id: 1,
      name: 'bbb',
      status: 'doing'
    }
  ]
}

const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    create: (state: State, action: PayloadAction<string>) => {
      state.count++
      const todo: TodoType = {
        id: state.count,
        name: action.payload,
        status: 'todo'
      }
      state.todos = [...state.todos, todo]
    },
    doing: (state: State, action: PayloadAction<TodoType>) => {
      const todo = state.todos.find((row) => row.id === action.payload.id)
      if (todo) {
        todo.status = 'doing'
      }
    },
    done: (state: State, action: PayloadAction<TodoType>) => {
      const todos = state.todos.filter((row) => row.id !== action.payload.id)
      state.todos = todos
    }
  }
})

export const { create, doing, done } = todo.actions

export default todo.reducer
