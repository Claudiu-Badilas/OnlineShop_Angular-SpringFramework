import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Category } from '../../../models/category';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: Category[];
  currentCategory: Category;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
};

const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => {
    return {
      ...state,
      categories: state.categories,
    };
  }),
  on(CategoryActions.loadCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories,
    };
  }),
  on(CategoryActions.setCurrentCategory, (state) => {
    return {
      ...state,
      currentCategory: state.currentCategory,
    };
  })
);

const getCategoryFeatureState =
  createFeatureSelector<CategoryState>('categories');

export const getAllCategories = createSelector(
  getCategoryFeatureState,
  (state) => state.categories
);

export const getCurrentCategory = createSelector(
  getCategoryFeatureState,
  (state, currentCategoryId) =>
    state.categories.find((c) => c.id === currentCategoryId)
);

export function reducer(state: CategoryState, action: Action) {
  return categoryReducer(state, action);
}
