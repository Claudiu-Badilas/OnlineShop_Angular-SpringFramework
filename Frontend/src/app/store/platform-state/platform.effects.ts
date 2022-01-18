import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { combineLatest, EMPTY, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { AppState } from '../app.state';
import { select, Store } from '@ngrx/store';
import * as PlatformActions from './platform.actions';
import { CategoryService } from '../../services/category.service';
import * as fromState from '../app.state';
import * as fromPlatform from '../platform-state/platform.reducer';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { ProductTypeAction } from 'src/app/components/product/utils/product-type-action.util';
@Injectable()
export class PlatformEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthenticationService,
    private _productService: ProductService,
    private store: Store<AppState>,
    private _categoryService: CategoryService,
    private _notificationService: NotificationService
  ) {}

  loadProducts$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getAllProducts)),
    ]).pipe(
      debounceTime(500),
      filter(([, products]) => products.length === 0),
      mergeMap(([,]) => {
        return this._productService.getProducts().pipe(
          first(),
          map((products) => {
            return PlatformActions.loadProducts({ products });
          }),
          catchError(() => {
            this._notificationService.notify(
              NotificationType.ERROR,
              'Some problems occurred, please refresh the page!'
            );
            return EMPTY;
          })
        );
      })
    )
  );

  loadProduct$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromState.getRouterParams)),
      this.store.pipe(select(fromPlatform.getSelectedProduct)),
    ]).pipe(
      debounceTime(500),
      filter(
        ([url, params, selectedProduct]) =>
          (url.startsWith(`/product/`) ||
            url.startsWith(`/edit-mode/${ProductTypeAction.EDIT}/`)) &&
          !!params &&
          !selectedProduct
      ),
      mergeMap(([, params]) => {
        this.store.dispatch(
          PlatformActions.setTypeAction({ typeAction: ProductTypeAction.EDIT })
        );
        return this._productService.getProductById(+params['productId']).pipe(
          first(),
          map((product) => {
            return PlatformActions.changeSelectedProduct({
              selectedProduct: product,
            });
          }),
          catchError(() => {
            this._notificationService.notify(
              NotificationType.ERROR,
              'Some problems occurred, please refresh the page!'
            );
            return EMPTY;
          })
        );
      })
    )
  );

  loadCategories$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromState.getRouterParams)),
      this.store.pipe(select(fromPlatform.getAllCategories)),
    ]).pipe(
      debounceTime(500),
      filter(([, , categories]) => categories.length === 0),
      mergeMap(([, params]) =>
        this._categoryService.getCategories().pipe(
          map((categories) => {
            const category = categories.find(
              (c) => c.name === params['categoryName']
            );
            this.store.dispatch(
              PlatformActions.changeSelectedCategory({
                selectedCategory: category ? category : categories[0],
              })
            );

            return PlatformActions.loadCategories({ categories });
          }),
          catchError(() => {
            this._notificationService.notify(
              NotificationType.ERROR,
              'Some problems occurred, please refresh the page!'
            );
            return EMPTY;
          })
        )
      )
    )
  );

  changeCategory$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromState.getRouterParams)),
      this.store.pipe(select(fromPlatform.getAllCategories)),
      this.store.pipe(select(fromPlatform.getSelectedCategory)),
    ]).pipe(
      debounceTime(200),
      filter(([url, params, , selectedCategory]) => {
        return (
          url.startsWith(`/products`) &&
          selectedCategory &&
          params &&
          params['name'] !== selectedCategory.name
        );
      }),
      map(([, params, categories]) => {
        const category = categories.find(
          (c) => c.name === params['categoryName']
        );

        return PlatformActions.changeSelectedCategory({
          selectedCategory: category,
        });
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
        this._productService
          .editProduct(action.product)
          .pipe(
            map((product) => PlatformActions.editProductSuccess({ product }))
          )
      )
    );
  });

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlatformActions.deleteProduct),
      withLatestFrom(
        this.store.select(fromPlatform.getSelectedProduct),
        this.store.select(fromPlatform.getAllProducts)
      ),
      concatMap(([, product, allProducts]) =>
        this._productService.deleteProduct(product.id).pipe(
          map(() => {
            this._notificationService.notify(
              NotificationType.SUCCESS,
              'Your selected product was deleted successfully'
            );
            const remainingProducts = allProducts.filter(
              (p) => p.id !== product.id
            );

            this.store.dispatch(
              PlatformActions.changeSelectedProduct({
                selectedProduct: null,
              })
            );

            return PlatformActions.loadProducts({
              products: remainingProducts,
            });
          })
        )
      )
    )
  );

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
