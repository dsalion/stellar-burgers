import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingridientsReducer from './ingridients/ingridients-slice';
import burgerConstructorSlice from './burgerConstructor/burgerConstructor-slice';
import userSlice from './user/user-slice';
import ordersSlice from './orders/orders-slice';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: burgerConstructorSlice,
  user: userSlice,
  orders: ordersSlice
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
