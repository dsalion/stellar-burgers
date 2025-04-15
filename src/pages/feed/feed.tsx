import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrders,
  getOrdersSelector
} from '../../services/orders/orders-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngridients } from '../../services/ingridients/ingridients-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(getOrdersSelector);
  console.log('orders', orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngridients());
    dispatch(getOrders());
  }, []);
  const handleGetFeeds = () => {
    dispatch(getOrders());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
