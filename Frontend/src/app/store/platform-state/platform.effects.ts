import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  debounceTime,
  filter,
  first,
  map,
  mergeMap,
} from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { AppState } from '../app.state';
import { select, Store } from '@ngrx/store';
import * as PlatformActions from './platform.actions';
import { CategoryService } from '../../services/category.service';
import * as fromState from '../app.state';
import * as fromPlatform from '../platform-state/platform.reducer';
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
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getAllProducts)),
    ]).pipe(
      debounceTime(500),
      filter(([, products]) => products.length === 0),
      mergeMap(([,]) => {
        console.log('loadProductsSSSSSSSSSSSSs');
        return this._productService.getProducts().pipe(
          first(),
          map((products) => {
            return PlatformActions.loadProducts({ products });
          })
        );
      })
    )
  );

  loadProduct$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromState.getRouterParams)),
      this.store.pipe(select(fromPlatform.getCurrentProduct)),
    ]).pipe(
      debounceTime(500),
      filter(
        ([url, params, selectedProduct]) =>
          url.startsWith(`/product/`) && !!params && selectedProduct === null
      ),
      mergeMap(([, params]) => {
        console.log('loadProduct');
        return this._productService.getProductById(+params['id']).pipe(
          first(),
          map((product) => {
            return PlatformActions.setCurrentProduct({
              setCurrentProduct: product,
            });
          })
        );
      })
    )
  );

  loadCategories$ = createEffect(() =>
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromPlatform.getAllCategories)),
    ]).pipe(
      debounceTime(500),
      filter(([, categories]) => categories.length === 0),
      mergeMap(() =>
        this._categoryService.getCategories().pipe(
          map((categories) => {
            this.store.dispatch(
              PlatformActions.setCurrentCategory({ category: categories[0] })
            );

            return PlatformActions.loadCategories({ categories });
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
      this.store.pipe(select(fromPlatform.getCurrentCategory)),
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
        const category = categories.find((c) => c.name === params['name']);

        return PlatformActions.setCurrentCategory({ category });
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
