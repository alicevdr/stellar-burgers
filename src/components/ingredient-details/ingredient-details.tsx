import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';

import { useSelector } from '@services/store';

import type { RootState } from '@services/store';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();
  const ingredient = useSelector((state: RootState) =>
    state.ingredients.items.find((item) => item._id === id)
  );

  if (!ingredient) return <Preloader />; // или null

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
