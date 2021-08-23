import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../../../models/product';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: Product[];
  currentProduct: Product;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state, action) => {
    return {
      ...state,
      products: state.products,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: null,
    };
  })
);

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state, currentProductId) =>
    state.products.find((p) => p.id === currentProductId)
);

export function reducer(state: ProductState, action: Action) {
  return productReducer(state, action);
}
