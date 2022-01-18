import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';

export const changeCartItems = createAction(
  '[Cart] Change  Cart Items',
  props<{ items: CartItem[] }>()
);

export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ product: Product }>()
);
