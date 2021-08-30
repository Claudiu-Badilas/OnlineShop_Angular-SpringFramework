import { Product } from 'src/app/models/product';
import { createAction, props } from '@ngrx/store';

export const loadCartProducts = createAction(
  '[Shopping-Cart] Load Cart Products'
);

export const loadCartProductsSuccess = createAction(
  '[Shopping-Cart] Load Cart Products Success',
  props<{ products: Product[] }>()
);

export const loadCartProductsFailure = createAction(
  '[Shopping-Cart] Load Cart Products Failure',
  props<{ error: string }>()
);
