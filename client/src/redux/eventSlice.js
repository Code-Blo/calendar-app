// src/redux/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get('http://localhost:5000/api/events');
  return res.data;
});

export const addEvent = createAsyncThunk('events/addEvent', async (eventData) => {
  const res = await axios.post('http://localhost:5000/api/events', eventData);
  return res.data;
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default eventSlice.reducer;
