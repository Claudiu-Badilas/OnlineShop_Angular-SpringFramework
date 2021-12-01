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
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../../store/platform-state/platform.actions';
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
  user$ = this.store.select(fromPlatform.getUser);
  products$ = this.store.select(fromPlatform.getAllProductsByCategory);
  categories$ = this.store.select(fromPlatform.getAllCategories);
  isLoading$ = this.store.select(fromPlatform.getSpinnerLoading);

  ADMIN = Role.ADMIN;
  page = 1;
  pageSize = 15;

  constructor(
    private productService: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PlatformActions.setSpinnerLoading({ isLoading: true }));
    this.store.dispatch(PlatformActions.loadUser());
    this.store.dispatch(PlatformActions.loadCategories());
    this.store.dispatch(PlatformActions.loadProducts());
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
      PlatformActions.setCurrentProduct({ setCurrentProduct: product })
    );
    this.store.dispatch(
      PlatformActions.setTypeAction({ typeAction: ProductTypeAction.UPDATE })
    );
  }

  addToCart(product: Product) {
    this._cartService.addToCart(new CartItem(product));
  }

  changeCategory(category) {
    this.store.dispatch(PlatformActions.setSpinnerLoading({ isLoading: true }));
    this.store.dispatch(PlatformActions.setCurrentCategory({ category }));
    this.store.dispatch(
      PlatformActions.setSpinnerLoading({ isLoading: false })
    );
  }
}
