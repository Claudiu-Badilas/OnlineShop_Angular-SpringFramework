import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../components/product/product-state/product.reducer';
import * as fromCategories from '../components/product/category-state/category.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';

export interface AppState {
  user: any;
  products: fromProducts.ProductState;
  categories: fromCategories.CategoryState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: null,
  products: fromProducts.reducer,
  categories: fromCategories.reducer,
  shoppingCart: fromShoppingCart.reducer,
};
