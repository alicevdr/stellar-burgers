import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderByNumberApi } from '@api';
import { Preloader, OrderInfoUI } from '@ui';
import { useSelector } from '@services/store';
import type { RootState } from '@services/store';

import type { TIngredient, TOrder } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (number) {
      setIsLoading(true);
      getOrderByNumberApi(Number(number))
        .then((res) => setOrderData(res.orders[0]))
        .catch(() => setOrderData(null))
        .finally(() => setIsLoading(false));
    }
  }, [number]);

  const currentOrder = orderData ?? orderModalData;

  const orderInfo = useMemo(() => {
    if (!currentOrder || !ingredients.length) return null;

    const date = new Date(currentOrder.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = currentOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
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

    return { ...currentOrder, ingredientsInfo, date, total };
  }, [currentOrder, ingredients]);

  if (isLoading || !orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};