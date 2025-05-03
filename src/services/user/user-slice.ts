import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { error } from 'console';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

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
  user: { name: string; email: string } | null;
  error: string | null | undefined;
  loading: boolean;
  isAuthChecked: boolean;
}

export const initialState: IUserState = {
  user: null,
  error: null,
  loading: false,
  isAuthChecked: false
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

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    const res = await forgotPasswordApi(data);
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    const res = await resetPasswordApi(data);
  }
);

export const getUserAp = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: IRegistration) => {
    const res = await updateUserApi(data);
    return res;
  }
);

export const logOut = createAsyncThunk('user/logOut', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => {
          dispatch(setAuthChecked(true));
        });
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(getUserAp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUserAp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(getUserAp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
