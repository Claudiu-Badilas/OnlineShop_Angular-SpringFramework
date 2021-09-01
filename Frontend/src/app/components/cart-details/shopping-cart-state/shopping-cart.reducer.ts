import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from 'src/app/models/product';
import * as ShoppingCartActions from './shopping-cart.actions';

export interface ShoppingCartState {
  products: Product[];
  error: string;
}

const initialState: ShoppingCartState = {
  products: [],
  error: null,
};

const shoppingCartReducer = createReducer(
  initialState,
  on(ShoppingCartActions.loadCartProducts, (state) => {
    return {
      ...state,
      products: state.products,
    };
  })
);

const getShoppingCartFeatureState =
  createFeatureSelector<ShoppingCartState>('shoppingCart');

export const getAllCartProducts = createSelector(
  getShoppingCartFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getShoppingCartFeatureState,
  (state) => state.error
);

export function reducer(state: ShoppingCartState, action: Action) {
  return shoppingCartReducer(state, action);
}
