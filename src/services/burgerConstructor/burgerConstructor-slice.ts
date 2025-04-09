import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { stat } from 'fs';

export interface IBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngridient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngridient: (state, action) => {
      state.ingredients.splice(action.payload.index, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectIngridient: (state) => state.ingredients,
    selectBurger: (state) => state
  }
});

export const { selectBun, selectIngridient, selectBurger } =
  burgerConstructorSlice.selectors;

export const { addIngridient, removeIngridient, clearConstructor } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
