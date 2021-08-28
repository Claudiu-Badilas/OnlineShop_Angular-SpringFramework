import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/services/product.service';
import * as ProductActions from './product.actions';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private _productService: ProductService,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this._productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  saveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.saveProduct),
      concatMap((action) =>
        this._productService.saveProduct(action.product).pipe(
          map((product) => ProductActions.saveProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.saveProductFailure({ error }))
          )
        )
      )
    );
  });

  editProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.editProduct),
      concatMap((action) =>
        this._productService.editProduct(action.product).pipe(
          map((product) => ProductActions.editProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.editProductFailure({ error }))
          )
        )
      )
    );
  });
}
