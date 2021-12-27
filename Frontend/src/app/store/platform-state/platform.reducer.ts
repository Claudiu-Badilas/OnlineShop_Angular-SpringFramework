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
  currentCategory: Category;
  isLoading: boolean;
}

const initialState: PlatformState = {
  user: USER,
  products: [],
  selectedProduct: null,
  typeAction: ProductTypeAction.SAVE,
  categories: [],
  currentCategory: null,
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

  on(PlatformActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      selectedProduct: action.setCurrentProduct,
    };
  }),

  on(PlatformActions.deleteProductSuccess, (state) => {
    return {
      ...state,
      selectedProduct: null,
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

  on(PlatformActions.setCurrentCategory, (state, action) => {
    return {
      ...state,
      currentCategory: action.category,
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

export const getCurrentCategory = createSelector(
  getPlatformFeatureState,
  (state) => state.currentCategory
);

export const getAllProductsByCategory = createSelector(
  getPlatformFeatureState,
  getCurrentCategory,
  (state, currentCategory) =>
    state.products.filter((p) => p.category.name === currentCategory.name)
);

export const getCurrentProduct = createSelector(
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
