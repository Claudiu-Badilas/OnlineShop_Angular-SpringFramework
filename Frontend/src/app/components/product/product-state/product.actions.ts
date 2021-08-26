import { Product } from 'src/app/models/product';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Failure',
  props<{ error: string }>()
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ setCurrentProduct: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Product'
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Fail',
  props<{ error: string }>()
);
