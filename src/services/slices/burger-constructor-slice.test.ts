import {
  burgerConstructorReducer,
  initialState,
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
    const state = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('должен вернуть текущее состояние при неизвестном экшене', () => {
    const newState = burgerConstructorReducer(initialState, { type: 'UNKNOWN' });
    expect(newState).toEqual(initialState);
  });

  test('должен добавить булку в состояние', () => {
    const mockId = 'mock-bun-id';
    const action = {
      type: addIngredient.type,
      payload: { ...mockBun, id: mockId },
    };
    
    const newState = burgerConstructorReducer(initialState, action);
    
    expect(newState).toEqual({
      ...initialState,
      bun: { ...mockBun, id: mockId },
    });
  });

  test('должен добавить начинку в состояние', () => {
    const mockId = 'mock-main-id';
    
    const action = {
      type: addIngredient.type,
      payload: { ...mockMain, id: mockId },
    };
    
    const newState = burgerConstructorReducer(initialState, action);
    
    expect(newState).toEqual({
      ...initialState,
      ingredients: [{ ...mockMain, id: mockId }],
    });
  });

  test('должен удалить ингредиент по id', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ ...mockMain, id: 'test-id' } as TConstructorIngredient],
    };
    
    const action = removeIngredient('test-id');
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    
    expect(newState).toEqual(initialState); 
  });

  test('должен переместить ингредиент', () => {
    const item1 = { ...mockMain, id: '1', name: 'Ингредиент 1' } as TConstructorIngredient;
    const item2 = { ...mockMain, id: '2', name: 'Ингредиент 2' } as TConstructorIngredient;
    
    const stateWithIngredients = {
      ...initialState,
      ingredients: [item1, item2],
    };
    
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    
    expect(newState).toEqual({
      ...initialState,
      ingredients: [item2, item1],
    });
  });

  test('должен очистить конструктор', () => {
    const stateWithIngredients = {
      ...initialState,
      bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
      ingredients: [{ ...mockMain, id: 'main-id' } as TConstructorIngredient],
    };
    
    const action = clearConstructor();
    const newState = burgerConstructorReducer(stateWithIngredients, action);
    
    expect(newState).toEqual(initialState); 
  });
});