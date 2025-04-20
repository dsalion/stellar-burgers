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
import { OnlyUnAuth, OnlyAuth } from '../Protected-route/protected-route';

import { AppHeader, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import store, { useAppDispatch } from '../../services/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { getIngridients } from '../../services/ingridients/ingridients-slice';
import {
  checkUserAuth,
  getIsAuthChecked
} from '../../services/user/user-slice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
