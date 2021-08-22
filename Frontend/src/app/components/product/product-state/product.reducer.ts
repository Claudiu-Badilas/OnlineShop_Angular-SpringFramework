import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import * as AppState from '../../../store/app.state';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product;
  categories: Category[];
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  categories: [],
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state, action) => {
    return {
      ...state,
      products: products,
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

export const getAllCategories = createSelector(
  getProductFeatureState,
  (state) => state.categories
);

const products = [
  {
    id: 1,
    name: 'Ohvaz cu ciocolata si goji',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: 15.0,
    image: '/assets/images/ovaz.jpg',
    category: {
      id: 1,
      name: 'Ovaz',
    },
  },
  {
    id: 2,
    name: 'Ohvaz cu ciocolata si goji',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: 15.0,
    image: '/assets/images/ovaz.jpg',
    category: {
      id: 1,
      name: 'Ovaz',
    },
  },
];
