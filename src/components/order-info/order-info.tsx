import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppSelector } from '../../services/store';
import { getIngridientsSelector } from '../../services/ingridients/ingridients-slice';
import { useParams } from 'react-router-dom';
import { getOrdersSelector } from '../../services/orders/orders-slice';

export const OrderInfo: FC = () => {
  const orderNumber = useParams().number;
  const order = useAppSelector(getOrdersSelector);
  console.log('orderNumber:', orderNumber);
  console.log('orderN:', order);
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = order.find(
    (element) => element.number === Number(orderNumber)
  );

  const ingredients: TIngredient[] = useAppSelector(getIngridientsSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
