import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  clearConstructor,
  selectBurger
} from '../../services/burgerConstructor/burgerConstructor-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/user/user-slice';
import { useNavigate } from 'react-router-dom';
import {
  closeModal,
  getCurrentOrdernameAndOrder,
  getModalToggler,
  sendOrder
} from '../../services/orders/orders-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };
  const constructorItems = useAppSelector(selectBurger);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log('constItems', constructorItems);

  const orderRequest = useAppSelector(getModalToggler);

  const orderModalData = useAppSelector(getCurrentOrdernameAndOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    const order: string[] = [];
    order.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((element) => {
      order.push(element._id);
    });
    order.push(constructorItems.bun._id);
    console.log('order:', order);
    dispatch(sendOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
