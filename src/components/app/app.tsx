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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  function onClose() {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Детали заказа'
                children={<OrderInfo />}
                onClose={onClose}
              />
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                children={<IngredientDetails />}
                onClose={onClose}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Детали заказа'
                children={<OrderInfo />}
                onClose={onClose}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
