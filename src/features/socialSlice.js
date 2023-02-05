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

  
  export const postCreate = async (newPost) => {
      try {
          return await axios.post(url, newPost);
      } catch (error) {
          console.log(error)
      }
  };
  export const postUpdate = async (id,updatePost) => {
      try {
          return await axios.patch(`${url}/${id}`, updatePost);
      } catch (error) {
          console.log(error)
      }
  };

const status = createSlice({
    name:'post',
    initialState,
    reducers:{
        createPost:(state,action)=>{
            postCreate(action.payload)
        },
        updatePost:(state,action)=>{
            const newPost = state.posts.map(post=>{
                if(post._id===action.payload._id) return action.payload;
                return post;
            })
            postUpdate(action.payload._id,action.payload)
            state.posts = newPost;
        },
        setLike:(state)=>{
          state.posts.likeCount+=1;
        }
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

export const {updatePost,createPost,setLike} = status.actions

export default status.reducer
