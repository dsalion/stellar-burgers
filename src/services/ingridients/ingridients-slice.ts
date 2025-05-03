import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { useState } from 'react';

export interface IIngridientsState {
  ingridients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
}

export const initialState: IIngridientsState = {
  ingridients: [],
  loading: false,
  error: null
};

export const getIngridients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngridientsSelector: (state) => state.ingridients,
    getIngridientsLoadingSelector: (state) => state.loading,
    getIngridientsErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      })
      .addCase(getIngridients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getIngridientsSelector,
  getIngridientsLoadingSelector,
  getIngridientsErrorSelector
} = ingridientsSlice.selectors;
export default ingridientsSlice.reducer;
