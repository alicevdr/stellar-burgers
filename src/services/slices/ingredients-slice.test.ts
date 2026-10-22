import { 
  ingredientsReducer, 
  initialState, 
  fetchIngredients 
} from './ingredients-slice';
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
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState); 
  });


  test('должен вернуть текущее состояние при неизвестном экшене', () => {
    const newState = ingredientsReducer(initialState, { type: 'UNKNOWN' });
    expect(newState).toEqual(initialState); 
  });

  test('должен установить isLoading = true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);
    
    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  test('должен записать ингредиенты при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };
    const newState = ingredientsReducer(initialState, action);
    
    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      items: mockIngredients,
    });
  });

  test('должен записать ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки',
    };
    const newState = ingredientsReducer(initialState, action);
    
    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки',
    });
  });
});