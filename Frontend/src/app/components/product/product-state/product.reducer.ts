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
  currentProduct: Product | null;
  error: string;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  error: null,
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
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
      currentProduct: action.setCurrentProduct,
    };
  }),

  on(ProductActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: null,
    };
  }),

  on(ProductActions.loadProductsFailure, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),

  on(ProductActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: null,
    };
  }),

  on(ProductActions.updateProductSuccess, (state, action) => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updateProducts,
      currentProduct: action.product,
      error: '',
    };
  }),

  on(ProductActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
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
  (state) => state.currentProduct
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export function reducer(state: ProductState, action: Action) {
  return productReducer(state, action);
}
