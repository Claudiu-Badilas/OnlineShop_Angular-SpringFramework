import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPlatform from './platform-state/platform.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.routerReducer;
  platform: fromPlatform.PlatformState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  router: fromRouter.reducer,
  platform: fromPlatform.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};

// const getRouterState =
//   createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
//     'router'
//   );

// export const getRouterParams = createSelector(
//   getRouterState,
//   (state: fromRouter.RouterReducerState<RouterStateUrl>) => {
//     if (state) {
//       return state.state.params;
//     }
//   }
// );
