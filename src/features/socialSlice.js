import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const initialState={
    posts:[],
    isLoading:true,
}
const url = "http://localhost:5000/posts";


export const getPosts = createAsyncThunk("post/getPosts", async (thunkAPI) => {
    try {
      const response = await axios(url);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  });

const status = createSlice({
    name:'post',
    initialState,
    reducers:{
        setPosts:(state,action)=>{
            state.posts = action.payload.posts
        },
        setPost:(state,action)=>{
            const newPost = state.payload.posts.map(post=>{
                if(post._id===action.payload.post_id) return action.payload.post;
                return post;
            })
            state.posts = newPost;
        },
    },
        extraReducers: {
            [getPosts.pending]: (state) => {
              state.isLoading = true;
            },
            [getPosts.fulfilled]: (state, action) => {
              state.isLoading = false;
              state.posts = action.payload;
            },
            [getPosts.rejected]: (state) => {
              state.isLoading = false;
            },
          },
})

export const {setPosts,setPost} = status.actions

export default status.reducer
