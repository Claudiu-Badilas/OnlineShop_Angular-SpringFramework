import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import * as CartActions from './shopping-cart.actions';

export interface CartState {
  items: CartItem[];
  price: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
  price: 0,
  quantity: 0,
};

const cartReducer = createReducer(
  initialState,
  on(CartActions.changeCartItems, (state, action) => ({
    ...state,
    items: action.items,
  })),

  on(CartActions.changeComputeCartTotals, (state, action) => ({
    ...state,
    price: action.price,
    quantity: action.quantity,
  })),

  on(CartActions.removeAllCartItems, (state) => ({
    ...state,
    items: [],
    price: 0,
    quantity: 0,
  }))
);

const getPlatformFeatureState = createFeatureSelector<CartState>('cart');

export const getCartItems = createSelector(
  getPlatformFeatureState,
  (state) => state.items
);

export const getCartPrice = createSelector(
  getPlatformFeatureState,
  (state) => state.price
);

export const getCartQuantity = createSelector(
  getPlatformFeatureState,
  (state) => state.quantity
);

export function reducer(state: CartState, action: Action) {
  return cartReducer(state, action);
}
