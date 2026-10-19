import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from './burger-constructor-slice';
import type { TIngredient, TConstructorIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

describe('burgerConstructorSlice', () => {
  test('должен вернуть начальное состояние при вызове с undefined', () => {
    const initialState = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(initialState).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  test('должен вернуть текущее состояние при неизвестном экшене', () => {
    const currentState = {
      bun: null,
      ingredients: [],
    };
    const newState = burgerConstructorReducer(currentState, { type: 'UNKNOWN' });
    expect(newState).toEqual(currentState);
  });

  test('должен добавить булку в состояние', () => {
    const action = addIngredient(mockBun);
    const newState = burgerConstructorReducer(undefined, action);
    expect(newState.bun).toBeDefined();
    expect(newState.bun?.name).toBe('Булка');
    expect(newState.ingredients).toHaveLength(0);
  });

  test('должен добавить начинку в состояние', () => {
    const action = addIngredient(mockMain);
    const newState = burgerConstructorReducer(undefined, action);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].name).toBe('Котлета');
    expect(newState.bun).toBeNull();
  });

  test('должен удалить ингредиент по id', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [{ ...mockMain, id: 'test-id' } as TConstructorIngredient],
    };
    const action = removeIngredient('test-id');
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    expect(newState.ingredients).toHaveLength(0);
  });

  test('должен переместить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMain, id: '1', name: 'Ингредиент 1' } as TConstructorIngredient,
        { ...mockMain, id: '2', name: 'Ингредиент 2' } as TConstructorIngredient,
      ],
    };
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    expect(newState.ingredients[0].name).toBe('Ингредиент 2');
    expect(newState.ingredients[1].name).toBe('Ингредиент 1');
  });

  test('должен очистить конструктор', () => {
    const stateWithIngredients = {
      bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
      ingredients: [{ ...mockMain, id: 'main-id' } as TConstructorIngredient],
    };
    const action = clearConstructor();
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});