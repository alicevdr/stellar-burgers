import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import type { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null,
};

export const createOrder = createAsyncThunk<TOrder, string[], { rejectValue: string }>(
  'order/create',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(ingredientIds);
      return res.order;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Не удалось создать заказ'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload ?? 'Ошибка создания заказа';
      });
  },
});

export const { clearOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
