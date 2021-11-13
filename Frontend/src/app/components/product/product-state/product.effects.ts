import { getCurrentProduct } from './product.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/services/product.service';
import * as ProductActions from './product.actions';
import * as fromProduct from './product.reducer';
import * as fromPlatform from '../../../platform-state/platform.reducer';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
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

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      withLatestFrom(this.store.select(fromPlatform.getRouterParams)),
      mergeMap(([action, params]) => {
        console.log(
          '🚀 ~ file: product.effects.ts ~ line 34 ~ ProductEffects ~ mergeMap ~ params',
          params
        );
        return this._productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        );
      })
    )
  );

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
          catchError((error) => of(ProductActions.editProductFailure()))
        )
      )
    );
  });

  // deleteProduct$ = createEffect(() => {
  //    this.actions$.pipe(
  //     ofType(ProductActions.deleteProduct),
  //     withLatestFrom(this.store.select(fromProduct.getCurrentProduct))
  //     ),
  //     map((([, product])) =>
  //       this._productService.deleteProduct(product.id).pipe(
  //         map((product) => ProductActions.editProductSuccess({ product })),
  //         catchError((error) =>
  //           of(ProductActions.editProductFailure())
  //         )
  //       )
  //     )
  // });
}
