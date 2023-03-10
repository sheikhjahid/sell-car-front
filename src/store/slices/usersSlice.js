import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../../axios";

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await backend
      .get("auth/users")
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  } catch (error) {
    return error.message;
  }
});

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (payload) => {
    try {
      const { userId } = payload;
      delete payload.userId;
      const response = await backend
        .put("profile/" + userId, payload)
        .then((res) => res)
        .catch((err) => err.response);

      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.users = action.payload.data;
      }
    }).addCase(updateProfile.fulfilled, (state, action) => {
        console.log(action.payload);
    })
  },
});

export const { setUsers } = usersSlice.actions;

export const getUsers = (state) => state.users.users;

export default usersSlice.reducer;
