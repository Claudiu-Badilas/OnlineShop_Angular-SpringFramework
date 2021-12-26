import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromPlatform from './platform-state/platform.reducer';
import * as fromShoppingCart from '../components/cart-details/shopping-cart-state/shopping-cart.reducer';
import * as fromOrders from '../components/order-list/order-state/order.reducer';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { RouterState } from './navigation-state/router-serializer';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterState>;
  platform: fromPlatform.PlatformState;
  shoppingCart: fromShoppingCart.ShoppingCartState;
  orders: fromOrders.OrderState;
}

export const appReducer: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  platform: fromPlatform.reducer,
  shoppingCart: fromShoppingCart.reducer,
  orders: fromOrders.reducer,
};

const getRouterState =
  createFeatureSelector<fromRouter.RouterReducerState<RouterState>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(getRouterState);

export const getRouterParams = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState<RouterState>) => {
    if (state) {
      return state.state.params;
    }
  }
);
export const getRouterUrl = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState<RouterState>) => {
    if (state) {
      return state.state.url;
    }
  }
);
