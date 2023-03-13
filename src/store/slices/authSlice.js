import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../../axios";

const initialState = {
  token: null,
  user: null,
};

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  try {
    const response = await backend
      .post("auth/signup", payload)
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    return error.message;
  }
});

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  try {
    const response = await backend
      .post("auth/signin", payload)
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    return error.message;
  }
});

export const signout = createAsyncThunk("auth/signout", async () => {
  try {
    const response = await backend
      .get("auth/signout")
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
      state.token = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
      const localStorageData = JSON.parse(localStorage.getItem("data"));

      localStorage.setItem(
        "data",
        JSON.stringify({
          ...localStorageData,
          user: state.user,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.token = action.payload.data.token;
          state.user = action.payload.data.user;
          localStorage.setItem(
            "data",
            JSON.stringify({
              token: state.token,
              user: state.user,
            })
          );
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.token = action.payload.data.token;
          state.user = action.payload.data.user;
          localStorage.setItem(
            "data",
            JSON.stringify({
              token: state.token,
              user: state.user,
            })
          );
        }
      })
      .addCase(signout.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          localStorage.clear();
          state.token = null;
          state.user = null;
        }
      });
  },
});

export const { setToken, setAuthUser } = authSlice.actions;

export const getToken = (state) => state.auth.token;
export const getAuthUser = (state) => state.auth.user;

export default authSlice.reducer;
