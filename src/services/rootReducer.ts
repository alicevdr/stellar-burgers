import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorReducer } from './slices/burger-constructor-slice';
import { feedReducer } from './slices/feed-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { orderReducer } from './slices/order-slice';
import { ordersReducer } from './slices/orders-slice';
import { userReducer } from './slices/user-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer,         
  orders: ordersReducer,     
});