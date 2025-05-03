import { getFeedsApi, getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TOrder } from '../../utils/types';

export const getOrders = createAsyncThunk('orders/getAll', async () =>
  getFeedsApi()
);

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const getUserOrders = createAsyncThunk('order/user', async () => {
  const res = getOrdersApi();
  return res;
});

export interface IOrdersState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  order: TOrder | null;
  userOrders: TOrder[];
  name: string | null;
  modalToggle: boolean;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  userOrders: [],
  order: null,
  name: null,
  modalToggle: false,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrdersLoadingSelector: (state) => state.loading,
    getOrdersErrorSelector: (state) => state.error,
    getOrdersTotalSelector: (state) => state.total,
    getOrdersTotalTodaySelector: (state) => state.totalToday,
    getOrdersTotalAndToday: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    userOrders: (state) => state.userOrders,
    getModalToggler: (state) => state.modalToggle,
    getCurrentOrdernameAndOrder: (state) => state.order
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
      })
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.modalToggle = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.modalToggle = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userOrders = action.payload;
      });
  }
});

export const {
  getOrdersSelector,
  getOrdersLoadingSelector,
  getOrdersErrorSelector,
  getOrdersTotalSelector,
  getOrdersTotalTodaySelector,
  getOrdersTotalAndToday,
  userOrders,
  getModalToggler,
  getCurrentOrdernameAndOrder
} = ordersSlice.selectors;

export const { closeModal } = ordersSlice.actions;

export default ordersSlice.reducer;
