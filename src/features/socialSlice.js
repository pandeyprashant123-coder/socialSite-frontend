import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../api'
const initialState = {
  posts: [],
  isLoading: true,
  postBtn: false,
  updateBtn: false,
};


export const getPosts = createAsyncThunk("post/getPosts", async (thunkAPI) => {
  try {
    const response = await API.get("/posts");
    //   console.log(response.data)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (newPost) => {
    // console.log(newPost,'its me')
    try {
      const response = await API.post("/posts", newPost);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedPost) => {
    try {
      // console.log(updatedPost, "ji");
      const response = await API.patch(
        `/posts/${updatedPost.currentId}`,
        updatedPost.toupdateData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    await API.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});
export const likePost = createAsyncThunk("post/likePost", async (id) => {
  try {
    const response = await API.patch(`/posts/${id}/likePost`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const status = createSlice({
  name: "post",
  initialState,
  reducers: {
    postIt: (state) => {
      state.postBtn ? (state.postBtn = false) : (state.postBtn = true);
    },
    updateIt: (state) => {
      state.updateBtn ? (state.updateBtn = false) : (state.updateBtn = true);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      const newPost = payload;
      state.posts.push(newPost);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      console.log(updatedPost);
      state.posts = updatedPost;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const afterDeleted = state.posts.filter(
        (post) => post._id !== action.payload
      );
      state.posts = afterDeleted;
      // console.log(afterDeleted,action.payload,'hello000')
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      const newPost = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      //   console.log(newPost)
      state.posts = newPost;
    });
  },
});

export const { postIt, updateIt } = status.actions;

export default status.reducer;
