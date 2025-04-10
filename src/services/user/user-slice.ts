import { loginUserApi, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { error } from 'console';
import { setCookie } from '../../utils/cookie';

export interface IRegistration {
  email: string;
  password: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserState {
  user: { name: string; email: string };
  error: string | null | undefined;
  loading: boolean;
  isAuthCheced: boolean;
}

const initialState: IUserState = {
  user: { name: '', email: '' },
  error: null,
  loading: false,
  isAuthCheced: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: IRegistration) => {
    const res = await registerUserApi(data);
    const { accessToken, refreshToken, user } = res;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: ILogin) => {
    const res = await loginUserApi(data);
    const { accessToken, refreshToken, user } = res;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthCheced = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthCheced = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthCheced = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthCheced = true;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthCheced
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export default userSlice.reducer;
