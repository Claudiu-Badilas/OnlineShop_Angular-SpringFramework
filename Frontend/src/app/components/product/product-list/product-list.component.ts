import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';
import { Role } from 'src/app/shared/enum/role.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import * as fromProducts from '../product-state/product.reducer';
import * as fromCategories from '../category-state/category.reducer';
import * as fromUser from '../../../authentication/user-state/user.reducer';
import * as UserActions from '../../../authentication/user-state/user.actions';
import * as ProductActions from '../product-state/product.actions';
import * as CategoriesActions from '../category-state/category.actions';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { ProductTypeAction } from '../utils/product-type-action.util';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  user: User;
  hasAccess: boolean = false;

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  errorMessage$: Observable<string>;

  constructor(
    private productService: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.hasAccess = this.checkRole();

    this.store.dispatch(UserActions.loadUser());
    this.store.select(fromUser.getUser).subscribe((user) => {
      this.user = user;
    });

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
        }, 100);
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
    this._cartService.addToCart(new CartItem(product));
  }

  public checkRole(): boolean {
    return this.user.role === Role.ADMIN;
  }
}
