import {
  getUserAp,
  initialState,
  loginUser,
  logOut,
  registerUser,
  updateUser,
  userSlice
} from './user-slice';

describe('userSlice reducer', () => {
  it('return initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
});

describe('registerUser', () => {
  it('registerUser fullfiled', () => {});
  it('registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('registerUser rejected', () => {});
});

describe('loginUser', () => {
  it('loginUser fullfiled', () => {});
  it('loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('loginUser rejected', () => {});
});

describe('getUserAp', () => {
  it('getUserAp fullfiled', () => {});
  it('getUserAp pending', () => {
    const action = { type: getUserAp.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('getUserAp rejected', () => {});
});

describe('updateUser', () => {
  it('updateUser fullfiled', () => {});
  it('updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('updateUser rejected', () => {});
});

describe('logOut', () => {
  it('logOut fullfiled', () => {});
  it('logOut pending', () => {
    const action = { type: logOut.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('logOut rejected', () => {});
});
