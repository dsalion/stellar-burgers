import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { userOrders, getUserOrders } from '../../services/orders/orders-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
