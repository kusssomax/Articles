import { configureStore } from "@reduxjs/toolkit"
import articleDataReducer from "./articles/articleSlice"

export const store = configureStore({
    reducer: {
        articles: articleDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch