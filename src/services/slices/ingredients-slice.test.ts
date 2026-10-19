import { ingredientsReducer, fetchIngredients } from './ingredients-slice';
import type { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png',
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 200,
    price: 100,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png',
  },
];

describe('ingredientsSlice', () => {

  test('должен вернуть начальное состояние при вызове с undefined', () => {
    const initialState = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(initialState).toEqual({
      items: [],
      isLoading: false,
      error: null,
    });
  });

  test('должен вернуть текущее состояние при неизвестном экшене', () => {
    const currentState = {
      items: mockIngredients,
      isLoading: false,
      error: null,
    };
    const newState = ingredientsReducer(currentState, { type: 'UNKNOWN' });
    expect(newState).toEqual(currentState);
  });

  test('должен установить isLoading = true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(undefined, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен записать ингредиенты при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };
    const newState = ingredientsReducer(undefined, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
  });

  test('должен записать ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки',
    };
    const newState = ingredientsReducer(undefined, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки');
  });
});