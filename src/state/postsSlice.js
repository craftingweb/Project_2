import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./common";

const initialState = {
  post: {},
  posts: [],
  loading: false,
  errorMessage: null,
  successMessage: null,
};

// Fetch All Posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${BASE_URL}/posts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

// Fetch Single Post
export const fetchPost = createAsyncThunk(
  "posts/fetchSingle",
  async (postId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

// Create Post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

// Edit Post
export const editPost = createAsyncThunk(
  "posts/createPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(item);
      const response = await fetch(`${BASE_URL}/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

// Delete Post

export const removePost = createAsyncThunk(
  "posts/fetchPost",
  async (postId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
      });
      return postId;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

// Posts Slice
export const postsSlice = createSlice({
  name: "posts/read",
  initialState,
  extraReducers: {
    // Fetch All Posts
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [...action.payload];
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },

    // Fetch Single Post
    [fetchPost.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },

    // Create Post
    [createPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },

    // Edit Post
    [editPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },

    // Delete Post
    [removePost.pending]: (state, action) => {
      state.loading = true;
      console.log(state.posts);
      state.error = null;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(state.posts);
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    [removePost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default postsSlice.reducer;
