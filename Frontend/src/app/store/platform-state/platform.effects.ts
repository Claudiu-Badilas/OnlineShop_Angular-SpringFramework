import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './platform.actions';
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  first,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { AppState, getRouterParams } from '../app.state';
import { select, Store } from '@ngrx/store';
import * as PlatformActions from './platform.actions';
import { CategoryService } from '../../services/category.service';
import * as NavigationActions from '../navigation-state/navigation.actions';
import * as fromState from '../app.state';
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

  // navigateWhenNoProductAvailable$ = createEffect(() =>
  //   combineLatest([
  //     this.store.pipe(select(fromState.getRouterUrl)),
  //     this.store.pipe(select(fromState.getRouterParams)),
  //   ]).pipe(
  //     debounceTime(500),
  //     filter(([url, params]) => true),
  //     map(([url, params]) => {
  //       console.log('🚀  params', params);
  //       console.log('🚀  url', url);
  //       this.store.dispatch(
  //         PlatformActions.setSpinnerLoading({ isLoading: false })
  //       );
  //       return NavigationActions.navigateTo({
  //         route: `products/category/Ovaz`,
  //       });
  //     })
  //   )
  // );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlatformActions.loadProducts),
      withLatestFrom(this.store.select(getRouterParams)),
      mergeMap(([action, params]) => {
        console.log(
          '🚀 ~ file: platform.effects.ts ~ line 60 ~ PlatformEffects ~ mergeMap ~ action',
          action
        );
        return this._productService.getProducts().pipe(
          first(),
          map((products) => {
            this.store.dispatch(
              PlatformActions.loadProductsSuccess({ products })
            );
            return PlatformActions.setSpinnerLoading({ isLoading: false });
          }),
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
