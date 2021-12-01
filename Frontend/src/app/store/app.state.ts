import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromPlatform from './platform-state/platform.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';
// import { RouterReducerState, getSelectors } from '@ngrx/router-store';
// import { RouterState } from './navigation-state/router-serializer';
// import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  // router: fromRouter.RouterReducerState<RouterState>;
  platform: fromPlatform.PlatformState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  // router: fromRouter.routerReducer,
  platform: fromPlatform.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};

// const getRouterState =
//   createFeatureSelector<RouterReducerState<RouterState>>('router');

// export const {
//   selectCurrentRoute,
//   selectFragment,
//   selectQueryParams,
//   selectQueryParam,
//   selectRouteParams,
//   selectRouteParam,
//   selectRouteData,
//   selectUrl,
// } = getSelectors(getRouterState);

// export const getRouterParams = createSelector(
//   selectQueryParams,
//   (state: RouterReducerState<RouterState>) => {
//     if (state) {
//       return state.state.params;
//     }
//   }
// );
