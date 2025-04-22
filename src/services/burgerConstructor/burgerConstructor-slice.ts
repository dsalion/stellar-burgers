import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Импортируем библиотеку для генерации UUID
import { TIngredient } from '@utils-types';

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
    addIngridient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return {
          payload: {
            ...ingredient,
            uuid: id
          }
        };
      }
    },
    removeIngridient: (state, action: PayloadAction<{ index: number }>) => {
      state.ingredients.splice(action.payload.index, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectIngridients: (state) => state.ingredients,
    selectBurger: (state) => state
  }
});

export const { selectBun, selectIngridients, selectBurger } =
  burgerConstructorSlice.selectors;

export const { addIngridient, removeIngridient, clearConstructor } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
