import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = axios.create({baseURL:'http://localhost:5000'})

// API.interceptors.request.use((req)=>{
//   if(localStorage.getItem('profile')){
//     console.log(JSON.parse(localStorage.getItem('profile')).token)
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//     }
//     return req
// })

import API from '../api'

const initialState = {
    authData:null
}
export const signin = createAsyncThunk("user/signin", async (formData) => {
    try {
      const {data} = await API.post('/user/signin',formData.formData);
      formData.navigate('/')  
      return data
    } catch (error) {
        console.log(error)
    }
  });
export const signup = createAsyncThunk("user/signup", async (formData) => {
    // console.log(formData.formData)
    try {
      const {data} = await API.post('/user/signup',formData.formData);
    //   console.log(data)
      formData.navigate('/')  
      return data
    } catch (error) {
      console.log(error)
    }
  });

const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authReducer:(state,action)=>{
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            const data = action.payload
            return {...state,authData:data}
        },
        logOut:(state)=>{
            localStorage.clear()
            return {...state,authData:null}
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(signin.fulfilled,(state,action)=>{
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            const data = action.payload
            return {...state,authData:data}
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            const data = action.payload
            return {...state,authData:data}
        })
    }
})

export const {authReducer,logOut} = auth.actions
export default auth.reducer