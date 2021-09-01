import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from '../authentication/user-state/user.reducer';
import * as fromProducts from '../components/product/product-state/product.reducer';
import * as fromCategories from '../components/product/category-state/category.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';

export interface AppState {
  user: fromUser.UserState;
  products: fromProducts.ProductState;
  categories: fromCategories.CategoryState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  products: fromProducts.reducer,
  categories: fromCategories.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};
