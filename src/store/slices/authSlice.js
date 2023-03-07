import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../../axios";

const initialState = {
  token: null,
};

export const signup = createAsyncThunk("auth/signup", (payload) => {
  try {
    const response = backend
      .post("auth/signup", payload)
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    return error.message;
  }
});

export const signin = createAsyncThunk("auth/signin", (payload) => {
  try {
    const response = backend
      .post("auth/signin", payload)
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    return error.message;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.token = action.payload.data.token;
          localStorage.setItem(
            "data",
            JSON.stringify({
              token: state.token,
            })
          );
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.token = action.payload.data.token;
          localStorage.setItem(
            "data",
            JSON.stringify({
              token: state.token,
            })
          );
        }
      });
  },
});

export const { setToken } = authSlice.actions;

export const getToken = (state) => state.auth.token;

export default authSlice.reducer;
