import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';
import type { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
};

export const fetchFeeds = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>('feed/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await getFeedsApi();
    return {
      orders: res.orders,
      total: res.total,
      totalToday: res.totalToday,
    };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Не удалось загрузить ленту'
    );
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка загрузки ленты';
      });
  },
});

export const feedReducer = feedSlice.reducer;
