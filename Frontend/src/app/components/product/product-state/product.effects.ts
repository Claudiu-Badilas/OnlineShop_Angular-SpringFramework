import { loadProducts } from './product.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/services/product.service';
import * as ProductActions from './product.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private _productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this._productService
          .getProducts()
          .pipe(
            map((products) => ProductActions.loadProductsSuccess({ products }))
          )
      )
    );
  });
}
