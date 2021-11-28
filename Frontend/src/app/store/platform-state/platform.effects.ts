import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './platform.actions';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as PlatformActions from './platform.actions';
import * as fromPlatform from './platform.reducer';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class PlatformEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthenticationService,
    private _productService: ProductService,
    private store: Store<AppState>,
    private _categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlatformActions.loadProducts),
      withLatestFrom(this.store.select(fromPlatform.getRouterParams)),
      mergeMap((action) => {
        return this._productService.getProducts().pipe(
          map((products) => PlatformActions.loadProductsSuccess({ products })),
          catchError((error) => of(null))
        );
      })
    )
  );

  saveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformActions.saveProduct),
      concatMap((action) =>
        this._productService
          .saveProduct(action.product)
          .pipe(
            map((product) => PlatformActions.saveProductSuccess({ product }))
          )
      )
    );
  });

  editProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformActions.editProduct),
      concatMap((action) =>
        this._productService.editProduct(action.product).pipe(
          map((product) => PlatformActions.editProductSuccess({ product })),
          catchError((error) => of(PlatformActions.editProductFailure()))
        )
      )
    );
  });

  // deleteProduct$ = createEffect(() => {
  //    this.actions$.pipe(
  //     ofType(PlatformActions.deleteProduct),
  //     withLatestFrom(this.store.select(fromProduct.getCurrentProduct))
  //     ),
  //     map((([, product])) =>
  //       this._productService.deleteProduct(product.id).pipe(
  //         map((product) => PlatformActions.editProductSuccess({ product })),
  //         catchError((error) =>
  //           of(PlatformActions.editProductFailure())
  //         )
  //       )
  //     )
  // });

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformActions.loadCategories),
      mergeMap(() =>
        this._categoryService.getCategories().pipe(
          map((categories) => {
            this.store.dispatch(
              PlatformActions.setCurrentCategory({ category: categories[0] })
            );

            return PlatformActions.loadCategoriesSuccess({ categories });
          }),
          catchError((error) => of(null))
        )
      )
    );
  });

  // loadOrders$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.loadUser),
  //     mergeMap(() =>
  //       this._authService.getUserFromLocalCache().pipe(
  //         map((user) => UserActions.loadUserSuccess({ user })),
  //         catchError((error) => of(null))
  //       )
  //     )
  //   );
  // });
}
