import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend from "../../axios";

const initialState = {
  reports: [],
};

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async () => {
    try {
      const response = await backend
        .get("report")
        .then((res) => res)
        .catch((err) => err.response);

      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const confirmRejectReport = createAsyncThunk(
  "report/confirmRejectReport",
  async (payload) => {
    try {
      const { id } = payload;
      delete payload.id;
      const response = await backend
        .put("report/confirm-approval/" + id, payload)
        .then((res) => res)
        .catch((err) => err.response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (payload) => {
    try {
      const response = await backend
        .delete("report/" + payload.id)
        .then((res) => res)
        .catch((err) => err.response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.reports = action.payload.data;
      }
    });
  },
});

export const { setReports } = reportSlice.actions;

export const getReports = (state) => state.report.reports;

export default reportSlice.reducer;
