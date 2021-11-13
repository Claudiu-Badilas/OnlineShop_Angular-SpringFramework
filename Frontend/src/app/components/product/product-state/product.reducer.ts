import { ProductTypeAction } from './../utils/product-type-action.util';
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
  selectedProduct: Product;
  typeAction: string;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: new Product(),
  typeAction: ProductTypeAction.SAVE,
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
      selectedProduct: action.setCurrentProduct,
    };
  }),

  on(ProductActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      selectedProduct: null,
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
      selectedProduct: null,
    };
  }),

  on(ProductActions.deleteProductSuccess, (state) => {
    return {
      ...state,
      selectedProduct: null,
    };
  }),

  on(ProductActions.saveProductSuccess, (state, action) => {
    const saveProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: saveProducts,
      selectedProduct: action.product,
      error: null,
    };
  }),

  on(ProductActions.saveProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(ProductActions.editProductSuccess, (state, action) => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updateProducts,
      selectedProduct: action.product,
      error: null,
    };
  }),

  on(ProductActions.setTypeAction, (state, action) => {
    return {
      ...state,
      typeAction: action.typeAction,
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
  (state) => state.selectedProduct
);

export const getTypeAction = createSelector(
  getProductFeatureState,
  (state) => state.typeAction
);

export function reducer(state: ProductState, action: Action) {
  return productReducer(state, action);
}
