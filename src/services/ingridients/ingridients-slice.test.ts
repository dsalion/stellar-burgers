import { getIngridients } from './ingridients-slice';
import { ingridientsSlice } from './ingridients-slice';
import { initialState } from './ingridients-slice';

const mockIngridients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('ingridientsSlice reducer', () => {
  it('return initial state', () => {
    expect(ingridientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('getIngridients fullfiled with mock', () => {
    const action = {
      type: getIngridients.fulfilled.type,
      payload: mockIngridients
    };
    const state = ingridientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ingridients: mockIngridients,
      loading: false,
      error: null
    });
  });
  it('getIngridients pending', () => {
    const action = { type: getIngridients.pending.type };
    const state = ingridientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('getIngridients error', () => {
    const action = {
      type: getIngridients.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = ingridientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'ggwp' });
  });
});
