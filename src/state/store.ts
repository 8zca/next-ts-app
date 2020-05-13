import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import * as reducers from './modules'

const rootReducer = combineReducers(reducers)

export type RootState = ReturnType<typeof rootReducer>

export const createStore = () => {
  const middlewares = [...getDefaultMiddleware()]

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares
  })
}
