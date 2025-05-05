import {
  getOrders,
  getUserOrders,
  initialState,
  ordersSlice,
  sendOrder
} from './orders-slice';

const mockAllOrders = {
  orders: [
    {
      _id: '68161e9de8e61d001cec5c65',
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space spicy антарианский бургер',
      createdAt: '2025-05-03T13:48:13.782Z',
      updatedAt: '2025-05-03T13:48:14.480Z',
      number: 76146
    }
  ],
  total: 75772,
  totalToday: 74
};

const mockUserOrders = {
  orders: [
    {
      _id: '6803b698e8e61d001cec36ff',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2025-04-19T14:43:36.827Z',
      updatedAt: '2025-04-19T14:43:37.637Z',
      number: 74916
    }
  ]
};

const mockSendOrder = {
  success: true,
  name: 'Краторный био-марсианский бургер',
  order: {
    ingredients: [
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '68162f59e8e61d001cec5c94',
    owner: {
      name: 'евгений',
      email: 'dsa1@santur.ru',
      createdAt: '2025-04-18T15:59:34.522Z',
      updatedAt: '2025-04-20T13:49:30.148Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-05-03T14:59:37.071Z',
    updatedAt: '2025-05-03T14:59:37.828Z',
    number: 76148,
    price: 2934
  }
};

describe('ingridientsSlice reducer', () => {
  it('return initial state', () => {
    expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
});

describe('getOrders', () => {
  it('getOrders pending', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('getOrders fullfiled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockAllOrders
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockAllOrders.orders,
      total: mockAllOrders.total,
      totalToday: mockAllOrders.totalToday
    });
  });
  it('getOrders rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'ggwp' });
  });
});

describe('sendOrder', () => {
  it('sendOrder pending', () => {
    const action = { type: sendOrder.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      modalToggle: true
    });
  });
  it('sendOrder fullfiled', () => {
    const action = {
      type: sendOrder.fulfilled.type,
      payload: mockSendOrder
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: mockSendOrder.order,
      name: mockSendOrder.name
    });
  });
  it('sendOrder rejected', () => {
    const action = {
      type: sendOrder.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'ggwp' });
  });
});

describe('getUserOrders', () => {
  it('getUserOrders pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('getUserOrders fullfiled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockUserOrders
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrders: mockUserOrders
    });
  });
  it('getUserOrders rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'ggwp' });
  });
});

describe('closeModal action', () => {
  it('reset order', () => {
    const stateWithOrder = {
      ...initialState,
      order: mockSendOrder.order
    };
    const state = ordersSlice.reducer(
      initialState,
      ordersSlice.actions.closeModal()
    );
    expect(state).toEqual({ ...stateWithOrder, order: null });
  });
});
