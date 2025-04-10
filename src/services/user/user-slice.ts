import { registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { error } from 'console';
import { setCookie } from 'src/utils/cookie';

export interface IRegistration {
  email: string;
  password: string;
  name: string;
}

export interface IUserState {
  user: { name: string; email: string };
  error: string | null | undefined;
  loading: boolean;
}

const initialState: IUserState = {
  user: { name: '', email: '' },
  error: null,
  loading: false
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
