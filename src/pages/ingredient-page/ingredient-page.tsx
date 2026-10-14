import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '@components';
import { fetchIngredients } from '@slices/ingredients-slice';
import { useDispatch, useSelector } from '@services/store';
import type { RootState } from '@services/store';
import { Preloader } from '@ui';

import styles from './ingredient-page.module.css';

export const IngredientPage = (): React.JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const isLoading = useSelector((state: RootState) => state.ingredients.isLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = ingredients.find((item) => item._id === id);

  if (isLoading || !ingredient) return <Preloader />;

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-large pt-30 pb-5">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};