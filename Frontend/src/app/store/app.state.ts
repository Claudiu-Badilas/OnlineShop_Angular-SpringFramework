import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../components/product/product-state/product.reducer';
import * as fromCategories from '../components/product/category-state/category.reducer';

export interface State {
  user: any;
  products: fromProducts.ProductState;
  categories: fromCategories.CategoryState;
}

export const appReducer: ActionReducerMap<State> = {
  user: null,
  products: fromProducts.reducer,
  categories: fromCategories.reducer,
};
