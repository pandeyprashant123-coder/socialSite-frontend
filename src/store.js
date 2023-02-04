import { configureStore } from "@reduxjs/toolkit";
import postReducer from './features/socialSlice'

export const store = configureStore({
    reducer:{
        post:postReducer
    }
})