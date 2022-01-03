import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from 'src/app/models/user';
import { USER } from 'src/app/shared/mocked-data/mocked-data';
import { ProductTypeAction } from '../../components/product/utils/product-type-action.util';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import * as PlatformActions from './platform.actions';

export interface PlatformState {
  user: User;
  products: Product[];
  selectedProduct: Product;
  typeAction: ProductTypeAction;
  categories: Category[];
  selectedCategory: Category;
  isLoading: boolean;
}

const initialState: PlatformState = {
  user: USER,
  products: [],
  selectedProduct: null,
  typeAction: ProductTypeAction.SAVE,
  categories: [],
  selectedCategory: null,
  isLoading: false,
};

const userReducer = createReducer(
  initialState,
  on(PlatformActions.loadUser, (state) => {
    return {
      ...state,
      user: state.user,
    };
  }),

  on(PlatformActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(PlatformActions.loadProducts, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),

  on(PlatformActions.changeSelectedProduct, (state, action) => {
    return {
      ...state,
      selectedProduct: action.selectedProduct,
    };
  }),

  on(PlatformActions.saveProductSuccess, (state, action) => {
    const saveProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: saveProducts,
      selectedProduct: action.product,
    };
  }),

  on(PlatformActions.editProductSuccess, (state, action) => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updateProducts,
      selectedProduct: action.product,
    };
  }),

  on(PlatformActions.setTypeAction, (state, action) => {
    return {
      ...state,
      typeAction: action.typeAction,
    };
  }),

  on(PlatformActions.loadCategories, (state, action) => {
    return {
      ...state,
      categories: action.categories,
    };
  }),

  on(PlatformActions.changeSelectedCategory, (state, action) => {
    return {
      ...state,
      selectedCategory: action.selectedCategory,
    };
  }),

  on(PlatformActions.setSpinnerLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  })
);

const getPlatformFeatureState =
  createFeatureSelector<PlatformState>('platform');

export const getUser = createSelector(
  getPlatformFeatureState,
  (state) => state.user
);

export const getAllProducts = createSelector(
  getPlatformFeatureState,
  (state) => state.products
);

export const getAllCategories = createSelector(
  getPlatformFeatureState,
  (state) => state.categories
);

export const getSelectedCategory = createSelector(
  getPlatformFeatureState,
  (state) => state.selectedCategory
);

export const getAllProductsByCategory = createSelector(
  getPlatformFeatureState,
  getSelectedCategory,
  (state, selectedCategory) =>
    state.products.filter((p) => p.category.name === selectedCategory.name)
);

export const getSelectedProduct = createSelector(
  getPlatformFeatureState,
  (state) => state.selectedProduct
);

export const getTypeAction = createSelector(
  getPlatformFeatureState,
  (state) => state.typeAction
);

export const getSpinnerLoading = createSelector(
  getPlatformFeatureState,
  (state) => state.isLoading
);

export function reducer(state: PlatformState, action: Action) {
  return userReducer(state, action);
}
