import { User } from '../../models/user';
import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductTypeAction } from 'src/app/components/product/utils/product-type-action.util';

export const loadUser = createAction(
  '[Platform] Load User',
  props<{ user: User }>()
);

export const isUserAdmin = createAction(
  '[Platform] Is User Admin',
  props<{ isUserAdmin: boolean }>()
);

export const loadProducts = createAction(
  '[Platform] Load Products',
  props<{ products: Product[] }>()
);

export const changeSelectedProduct = createAction(
  '[Platform] Change Selected Product',
  props<{ selectedProduct: Product }>()
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

export const loadCategories = createAction(
  '[Platform] Load Categories ',
  props<{ categories: Category[] }>()
);

export const changeSelectedCategory = createAction(
  '[Platform] Change Selected Category',
  props<{ selectedCategory: Category }>()
);

export const setSpinnerLoading = createAction(
  '[Platform] Set Spinner Loading',
  props<{ isLoading: boolean }>()
);
