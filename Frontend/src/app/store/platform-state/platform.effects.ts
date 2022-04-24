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
  skipWhile,
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
import { Role } from 'src/app/shared/enum/role.enum';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/models/product';

const ERROR_MSG = 'Some problems occurred, please refresh the page!';
@Injectable()
export class PlatformEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthenticationService,
    private _productService: ProductService,
    private store: Store<AppState>,
    private _categoryService: CategoryService,
    private _notificationService: NotificationService,
    private _orderService: OrderService
  ) {}

  loadUser$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getUser)),
    ]).pipe(
      debounceTime(500),
      filter(([, user]) => user === null),
      mergeMap(([,]) => {
        return this._authService.getUserFromLocalCache().pipe(
          first(),
          skipWhile((user) => !user),
          map((user) => {
            this.store.dispatch(
              PlatformActions.isAdminUser({
                isAdminUser: user.role === Role.ADMIN,
              })
            );

            return PlatformActions.loadUser({ user });
          }),
          catchError(() => {
            this._notificationService.notify(NotificationType.ERROR, ERROR_MSG);
            return EMPTY;
          })
        );
      })
    )
  );

  loadProducts$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getAllProducts)),
    ]).pipe(
      debounceTime(500),
      filter(([, products]) => products.length === 0),
      mergeMap(([,]) => {
        return this._productService.getProducts().pipe(
          skipWhile((p) => p === null),
          first(),
          map((products) => PlatformActions.loadProducts({ products })),
          catchError(() => {
            this._notificationService.notify(NotificationType.ERROR, ERROR_MSG);
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
          map((product) =>
            PlatformActions.changeSelectedProduct({
              selectedProduct: product,
            })
          ),
          catchError(() => {
            this._notificationService.notify(NotificationType.ERROR, ERROR_MSG);
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
          skipWhile((c) => c === null),
          first(),
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
            this._notificationService.notify(NotificationType.ERROR, ERROR_MSG);
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
          params['name'] !== null &&
          params['name'] !== selectedCategory.name
        );
      }),
      map(([, params, categories]) => {
        const category = categories.find(
          (c) => c !== null && c.name === params['categoryName']
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
            map((product: Product) =>
              PlatformActions.saveProductSuccess({ product })
            )
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

  loadOrders$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getUser)),
    ]).pipe(
      debounceTime(500),
      filter(([url]) => {
        return url.includes('/orders');
      }),
      mergeMap(([, user]) =>
        this._orderService.getOrdersByUserId(+user.id).pipe(
          map((orders) => PlatformActions.loadOrders({ orders })),
          catchError(() => {
            this._notificationService.notify(NotificationType.ERROR, ERROR_MSG);
            return EMPTY;
          })
        )
      )
    )
  );
}
