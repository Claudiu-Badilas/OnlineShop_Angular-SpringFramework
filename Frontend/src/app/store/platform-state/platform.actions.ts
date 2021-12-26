import { User } from '../../models/user';
import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductTypeAction } from 'src/app/components/product/utils/product-type-action.util';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[Platform] Load User Success',
  props<{ user: User }>()
);

export const loadProducts = createAction(
  '[Platform] Load Products',
  props<{ products: Product[] }>()
);

export const setCurrentProduct = createAction(
  '[Platform] Set Current Product',
  props<{ setCurrentProduct: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Platform] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Platform] Initialize Product'
);

export const saveProduct = createAction(
  '[Platform] Save Product',
  props<{ product: Product }>()
);

export const saveProductSuccess = createAction(
  '[Platform] Save Product Success',
  props<{ product: Product }>()
);

export const editProduct = createAction(
  '[Platform] Update Product',
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  '[Platform] Update Product Success',
  props<{ product: Product }>()
);

export const setTypeAction = createAction(
  '[Platform] Set Type Action Product Success',
  props<{ typeAction: ProductTypeAction }>()
);

export const deleteProduct = createAction('[Platform] Delete Product');

export const deleteProductSuccess = createAction(
  '[Platform] Delete Product Success',
  props<{ product: Product }>()
);

export const loadCategories = createAction(
  '[Platform] Load Categories ',
  props<{ categories: Category[] }>()
);

export const setCurrentCategory = createAction(
  '[Platform]Set Current Category',
  props<{ category: Category }>()
);

export const clearCurrentCategory = createAction(
  '[Platform]Clear Current Category'
);

export const setSpinnerLoading = createAction(
  '[Platform] Set Spinner Loading',
  props<{ isLoading: boolean }>()
);
