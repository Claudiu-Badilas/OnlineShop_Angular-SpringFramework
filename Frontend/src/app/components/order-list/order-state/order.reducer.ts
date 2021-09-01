import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Order } from 'src/app/models/order';
import * as OrderActions from './order.actions';

export interface OrderState {
  orders: Order[];
  error: string;
}

const initialState: OrderState = {
  orders: [],
  error: null,
};

const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => {
    return {
      ...state,
      orders: state.orders,
    };
  }),
  on(OrderActions.loadOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: action.orders,
    };
  }),
  on(OrderActions.loadOrdersFailure, (state, action) => {
    return {
      ...state,
      orders: [],
      error: action.error,
    };
  })
);

const getOrderFeatureState = createFeatureSelector<OrderState>('orders');

export const getAllOrders = createSelector(
  getOrderFeatureState,
  (state) => state.orders
);

export const getError = createSelector(
  getOrderFeatureState,
  (state) => state.error
);

export function reducer(state: OrderState, action: Action) {
  return orderReducer(state, action);
}
