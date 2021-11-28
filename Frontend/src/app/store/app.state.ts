import { ActionReducerMap } from '@ngrx/store';
import * as fromPlatform from './platform-state/platform.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';

export interface AppState {
  platform: fromPlatform.PlatformState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  platform: fromPlatform.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};
