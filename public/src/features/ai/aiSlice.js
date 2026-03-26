import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const analyzeFinance = createAsyncThunk(
  "ai/analyze",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/ai/analyze");
      return data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearResult(state) {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeFinance.pending, (state) => {
        state.loading = true;
        state.result = null;
      })
      .addCase(analyzeFinance.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(analyzeFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult } = aiSlice.actions;
export default aiSlice.reducer;
