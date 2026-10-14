import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearOrderModal, createOrder } from '@slices/order-slice';
import { useDispatch, useSelector } from '@services/store';
import type { RootState } from '@services/store';

import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );
  const user = useSelector((state: RootState) => state.user.user);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id),
      constructorItems.bun._id,
    ];

    dispatch(createOrder(ids));
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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