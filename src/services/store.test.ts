import store from './store';
import { rootReducer, useAppDispatch } from './store';
import { initialState as ingridientInitialState } from './ingridients/ingridients-slice';

describe('rootReducer', () => {
  it('rootReducer', () => {
    const state = store.getState();

    expect(state.ingridients).toEqual(ingridientInitialState);
  });
});
