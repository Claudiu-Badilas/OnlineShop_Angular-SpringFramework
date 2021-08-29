import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/shared/enum/role.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import * as fromProducts from '../product-state/product.reducer';
import * as fromCategories from '../category-state/category.reducer';
import * as ProductActions from '../product-state/product.actions';
import * as CategoriesActions from '../category-state/category.actions';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { ProductTypeAction } from '../utils/product-type-action.util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  hasAccess: boolean = false;

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  errorMessage$: Observable<string>;

  constructor(
    private productService: ProductService,
    private _cartService: CartService,
    private _authenticationService: AuthenticationService,
    private _notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.hasAccess = this.checkRole();

    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(fromProducts.getAllProducts);

    this.errorMessage$ = this.store.select(fromProducts.getError);

    this.store.dispatch(CategoriesActions.loadCategories());
    this.categories$ = this.store.select(fromCategories.getAllCategories);

    this.errorMessage$ = this.store.select(fromCategories.getError);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this._notificationService.notify(
          NotificationType.SUCCESS,
          'Your selected product was deleted successfully'
        );
      },
      (error) => console.error('There was an error!', error)
    );
  }

  initStateForEditMode(product: Product) {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ setCurrentProduct: product })
    );
    this.store.dispatch(
      ProductActions.setTypeAction({ typeAction: ProductTypeAction.UPDATE })
    );
  }

  initStateForSaveMode() {
    this.store.dispatch(
      ProductActions.setCurrentProduct({
        setCurrentProduct: new Product(),
      })
    );
    this.store.dispatch(
      ProductActions.setTypeAction({ typeAction: ProductTypeAction.SAVE })
    );
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.price}`);
    const theCartItem = new CartItem(product);
    this._cartService.addToCart(theCartItem);
  }

  public checkRole(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this._authenticationService.getUserFromLocalCache().role;
  }
}
