import { CategoryService } from '../../../services/category.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from './category.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private _categoryService: CategoryService
  ) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this._categoryService
          .getCategories()
          .pipe(
            map((categories) =>
              CategoryActions.loadCategoriesSuccess({ categories })
            )
          )
      )
    );
  });
}
