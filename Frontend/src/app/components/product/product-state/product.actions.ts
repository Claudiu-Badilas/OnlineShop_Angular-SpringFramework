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

export const saveProduct = createAction(
  '[Product] Save Product',
  props<{ product: Product }>()
);

export const saveProductSuccess = createAction(
  '[Product] Save Product Success',
  props<{ product: Product }>()
);

export const saveProductFailure = createAction(
  '[Product] Save Product Fail',
  props<{ error: string }>()
);

export const editProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

export const editProductFailure = createAction(
  '[Product] Update Product Fail',
  props<{ error: string }>()
);

export const setTypeAction = createAction(
  '[Product] Set Type Action Product Success',
  props<{ typeAction: string }>()
);
