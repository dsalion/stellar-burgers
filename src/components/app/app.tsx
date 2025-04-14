import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import store, { useAppDispatch } from '../../services/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { getIngridients } from '../../services/ingridients/ingridients-slice';

const App = () => (
  <div className={styles.app}>
    <Provider store={store}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Provider>
  </div>
);

export default App;
