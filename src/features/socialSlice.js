import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const initialState={
    posts:[],
    isLoading:true,
    postCount:0,
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

  
  export const createPost = createAsyncThunk("post/createPost",async (newPost) => {
      try {
          const response = await axios.post(url, newPost);
          return response.data;
      } catch (error) {
          console.log(error)
      }
  })
  export const updatePost =createAsyncThunk("post/updatePost",async (id,updatePost) => {
      try {
          const response = await axios.patch(`${url}/${id}`, updatePost);
          return response.data;
      } catch (error) {
          console.log(error)
      }
  });
  export const deletePost = createAsyncThunk("post/deletePost",async (id) => {
      try {
          await axios.delete(`${url}/${id}`);
          return id;
      } catch (error) {
          console.log(error)
      }
  });
  export const likePost = createAsyncThunk("post/likePost",async (id) => {
      try {
          const response = await axios.patch(`${url}/${id}/likePost`);
          return response.data;
      } catch (error) {
          console.log(error)
      }
  });

const status = createSlice({
    name:'post',
    initialState,
    reducers:{
        // createPost:(state,action)=>{
        //     postCreate(action.payload)
        //     // state.posts.push(action.payload)
        //     state.postCount=state.posts.length
        // },
        // updatePost:(state,action)=>{
        //     const newPost = state.posts.map(post=>{
        //         if(post._id===action.payload._id) return action.payload;
        //         return post;
        //     })
        //     console.log(newPost)
        //     postUpdate(action.payload._id,action.payload)
        //     state.posts = newPost;
        // },
        // setLike:(state,action)=>{
        //     const newPost = state.posts.map(post=>{
        //       if(post._id===action.payload._id) return action.payload;
        //       return post;
        //   })
        //   console.log(newPost)
        //   postLike(action.payload._id)
        //   state.posts = newPost;
        // },
        // deletPost:(state,{payload})=>{
        //     const newPost=state.posts.filter((post)=>post._id!==payload)
        //     postDelete(payload)
        //     state.posts = newPost;
        //     console.log('hello000')
        // }
        
    },
        extraReducers:(builder) =>{
            builder.addCase(getPosts.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected,(state)=>{
                state.isLoading = false;
            });
            builder.addCase(createPost.fulfilled,(state,{payload})=>{
                const newPost=payload
                state.posts.push(newPost)
            });
            builder.addCase(updatePost.fulfilled,(state,action)=>{
                const updatedPost = state.posts.map(post=>{
                    if(post._id===action.payload._id) return action.payload;
                    return post;
                })
                console.log(updatedPost)
                state.posts = updatePost;
            });
            builder.addCase(deletePost.fulfilled,(state,action)=>{
                const afterDeleted=state.posts.filter((post)=>post._id!==action.payload)
                state.posts = afterDeleted;
                console.log(afterDeleted,action.payload,'hello000')
            });
            builder.addCase(likePost.fulfilled,(state,action)=>{
                const newPost = state.posts.map(post=>{
                  if(post._id===action.payload._id) return action.payload;
                  return post;
              })
              console.log(newPost)
              state.posts = newPost;
            });
          },
})

// export const {} = status.actions

export default status.reducer
