import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const loadCategories = createAction('[Categories] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Categories] Load Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Failure',
  props<{ error: string }>()
);

export const setCurrentCategory = createAction(
  '[Categories] Set Current Category',
  props<{ category: Category }>()
);

export const clearCurrentCategory = createAction(
  '[Categories] Clear Current Category'
);
