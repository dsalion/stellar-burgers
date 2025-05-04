import {
  getUserAp,
  initialState,
  loginUser,
  logOut,
  registerUser,
  updateUser,
  userSlice
} from './user-slice';

const mockUser = {
  email: 'prutkov@ya.ru',
  name: 'kozma prutkov'
};

describe('userSlice reducer', () => {
  it('return initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
});

describe('registerUser', () => {
  it('registerUser fullfiled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  it('registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'ggwp'
    });
  });
});

describe('loginUser', () => {
  it('loginUser fullfiled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  it('loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('loginUser rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'ggwp'
    });
  });
});

describe('getUserAp', () => {
  it('getUserAp fullfiled', () => {
    const action = {
      type: getUserAp.fulfilled.type,
      payload: { success: true, user: mockUser }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  it('getUserAp pending', () => {
    const action = { type: getUserAp.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('getUserAp rejected', () => {
    const action = {
      type: getUserAp.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'ggwp'
    });
  });
});

describe('updateUser', () => {
  it('updateUser fullfiled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { success: true, user: mockUser }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  it('updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'ggwp'
    });
  });
});

describe('logOut', () => {
  it('logOut fullfiled', () => {
    const action = { type: logOut.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  it('logOut pending', () => {
    const action = { type: logOut.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('logOut rejected', () => {
    const action = {
      type: logOut.rejected.type,
      error: { message: 'ggwp' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'ggwp'
    });
  });
  describe('test reducers', () => {
    it('setUser', () => {
      const action = userSlice.actions.setUser(mockUser);
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user: mockUser });
    });
    it('setAuthChecked', () => {
      const action = userSlice.actions.setAuthChecked(true);
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });
  });
});
