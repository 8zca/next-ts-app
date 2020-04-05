import { combineReducers, configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import counterModule from './modules/counterModule'
import todoModule from './modules/todoModule'

const rootReducer = combineReducers({
    counter: counterModule.reducer,
    todo: todoModule.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const createStore = () => {
    const middlewares = [...getDefaultMiddleware()]

    return configureStore({
        reducer: rootReducer,
        middleware: middlewares,
    })
}
