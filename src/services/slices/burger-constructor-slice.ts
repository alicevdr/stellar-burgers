import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: { payload: TConstructorIngredient }) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },

      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() } as TConstructorIngredient,
      }),
    },

    removeIngredient: (state, action: { payload: string }) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },

    moveIngredient: (
      state,
      action: { payload: { fromIndex: number; toIndex: number } }
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
