import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TOrder } from 'src/utils/types';
export const getOrders = createAsyncThunk('orders/getAll', async () =>
  getFeedsApi()
);

export interface IOrdersState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrdersLoadingSelector: (state) => state.loading,
    getOrdersErrorSelector: (state) => state.error,
    getOrdersTotalSelector: (state) => state.total,
    getOrdersTotalTodaySelector: (state) => state.totalToday,
    getOrdersTotalAndToday: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getOrdersSelector,
  getOrdersLoadingSelector,
  getOrdersErrorSelector,
  getOrdersTotalSelector,
  getOrdersTotalTodaySelector,
  getOrdersTotalAndToday
} = ordersSlice.selectors;

export default ordersSlice.reducer;
