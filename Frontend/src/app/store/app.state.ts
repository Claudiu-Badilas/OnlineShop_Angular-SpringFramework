import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../components/product/product-state/product.reducer';
import * as fromCategories from '../components/product/category-state/category.reducer';

export interface AppState {
  user: any;
  products: fromProducts.ProductState;
  categories: fromCategories.CategoryState;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: null,
  products: fromProducts.reducer,
  categories: fromCategories.reducer,
};
