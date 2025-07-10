import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "../../api/axios";

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get('/events');
  return res.data;
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (id) => {
  const res = await axios.get(`/events/${id}`);
  return res.data;
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.selectedEvent = null;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;