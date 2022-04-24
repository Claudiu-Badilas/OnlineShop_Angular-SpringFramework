import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { ProductTypeAction } from '../../components/product/utils/product-type-action.util';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import * as PlatformActions from './platform.actions';

export interface PlatformState {
  user: User;
  isAdminUser: boolean;
  products: Product[];
  selectedProduct: Product;
  typeAction: ProductTypeAction;
  categories: Category[];
  selectedCategory: Category;
  orders: Order[];
  isLoading: boolean;
}

const initialState: PlatformState = {
  user: null,
  isAdminUser: false,
  products: [],
  selectedProduct: null,
  typeAction: ProductTypeAction.SAVE,
  categories: [],
  selectedCategory: null,
  orders: [],
  isLoading: false,
};

const userReducer = createReducer(
  initialState,
  on(PlatformActions.loadUser, (state, action) => ({
    ...state,
    user: action.user,
  })),

  on(PlatformActions.isAdminUser, (state, action) => ({
    ...state,
    isAdminUser: action.isAdminUser,
  })),

  on(PlatformActions.loadProducts, (state, action) => ({
    ...state,
    products: action.products,
  })),

  on(PlatformActions.changeSelectedProduct, (state, action) => ({
    ...state,
    selectedProduct: action.selectedProduct,
  })),

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

  on(PlatformActions.setTypeAction, (state, action) => ({
    ...state,
    typeAction: action.typeAction,
  })),

  on(PlatformActions.loadCategories, (state, action) => ({
    ...state,
    categories: action.categories,
  })),

  on(PlatformActions.changeSelectedCategory, (state, action) => ({
    ...state,
    selectedCategory: action.selectedCategory,
  })),

  on(PlatformActions.loadOrders, (state, action) => ({
    ...state,
    orders: action.orders,
  })),

  on(PlatformActions.setSpinnerLoading, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  }))
);

const getPlatformFeatureState =
  createFeatureSelector<PlatformState>('platform');

export const getUser = createSelector(
  getPlatformFeatureState,
  (state) => state.user
);
export const getIsAdminUser = createSelector(
  getPlatformFeatureState,
  (state) => state.isAdminUser
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
  getAllProducts,
  getSelectedCategory,
  (products, selectedCategory) =>
    products.filter(
      (p) =>
        selectedCategory !== null && p.category.name === selectedCategory.name
    )
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

export const getAllOrders = createSelector(
  getPlatformFeatureState,
  (state) => state.orders
);

export function reducer(state: PlatformState, action: Action) {
  return userReducer(state, action);
}
