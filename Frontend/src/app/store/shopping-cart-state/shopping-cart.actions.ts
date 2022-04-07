import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';

export const changeCartItems = createAction(
  '[Cart] Change  Cart Items',
  props<{ items: CartItem[] }>()
);

export const addMultipleProducts = createAction(
  '[Cart] Add Multiple Products',
  props<{ products: Product[] }>()
);

export const decreaseProduct = createAction(
  '[Cart] Decrease Product',
  props<{ product: Product }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ product: Product }>()
);

export const updateComputeCartTotals = createAction(
  '[Cart] Update Computed Cart Totals'
);

export const changeComputeCartTotals = createAction(
  '[Cart] Change Computed Cart Totals',
  props<{ price: number; quantity: number }>()
);

export const removeAllCartItems = createAction('[Cart] Remove All Cart Items');
