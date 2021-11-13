import { ActionReducerMap } from '@ngrx/store';
import * as fromPlatform from '../platform-state/platform.reducer';
import * as fromProducts from '../components/product/product-state/product.reducer';
import * as fromCategories from '../components/product/category-state/category.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';

export interface AppState {
  user: fromPlatform.UserState;
  products: fromProducts.ProductState;
  categories: fromCategories.CategoryState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: fromPlatform.reducer,
  products: fromProducts.reducer,
  categories: fromCategories.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};
