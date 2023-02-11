import { configureStore } from "@reduxjs/toolkit";
import postReducer from './features/socialSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
    reducer:{
        post:postReducer,
        auth:authReducer
    }
})