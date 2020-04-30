import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterModule from './modules/counter'
import todoModule from './modules/todo'
import usersModule from './modules/users'

const rootReducer = combineReducers({
  counter: counterModule.reducer,
  todo: todoModule.reducer,
  users: usersModule.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const createStore = () => {
  const middlewares = [...getDefaultMiddleware()]

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares
  })
}
