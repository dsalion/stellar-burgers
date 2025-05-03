import store from './store';
import { rootReducer, useAppDispatch } from './store';
import { initialState as ingridientInitialState } from './ingridients/ingridients-slice';
import { initialState as constructorInitialState } from './burgerConstructor/burgerConstructor-slice';
import { initialState as orderInitialState } from './orders/orders-slice';
import { initialState as userInitialState } from './user/user-slice';
describe('rootReducer', () => {
  it('rootReducer', () => {
    const state = store.getState();

    expect(state.ingridients).toEqual(ingridientInitialState);
    expect(state.burgerConstructor).toEqual(constructorInitialState);
    expect(state.orders).toEqual(orderInitialState);
    expect(state.user).toEqual(userInitialState);
  });
  it('return the correct initial state of the store', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);

    expect(initialState).toEqual({
      ingridients: ingridientInitialState,
      burgerConstructor: constructorInitialState,
      user: userInitialState,
      orders: orderInitialState
    });
  });
});
