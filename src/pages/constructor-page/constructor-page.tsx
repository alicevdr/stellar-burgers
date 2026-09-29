import { useEffect } from 'react';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { fetchIngredients } from '@slices/ingredients-slice';
import { useDispatch, useSelector } from '@services/store';
import { Preloader } from '@ui';

import styles from './constructor-page.module.css';

export const ConstructorPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ingredients.isLoading);
  const error = useSelector((state) => state.ingredients.error);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) return <Preloader />;

  if (error) {
    return (
      <p className={`${styles.title} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты: {error}
      </p>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};