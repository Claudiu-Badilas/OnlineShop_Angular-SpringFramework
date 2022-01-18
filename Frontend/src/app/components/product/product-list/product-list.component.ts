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
import * as NavigationActions from '../../../store/navigation-state/navigation.actions';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { ProductTypeAction } from '../utils/product-type-action.util';
import { User } from 'src/app/models/user';
import * as CartActions from '../../../store/shopping-cart-state/shopping-cart.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  user$ = this.store.select(fromPlatform.getUser);
  products$ = this.store.select(fromPlatform.getAllProductsByCategory);
  categories$ = this.store.select(fromPlatform.getAllCategories);
  selectedCategory$ = this.store.select(fromPlatform.getSelectedCategory);
  isLoading$ = this.store.select(fromPlatform.getSpinnerLoading);

  ADMIN = Role.ADMIN;
  page = 1;
  pageSize = 9;

  constructor(
    private productService: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PlatformActions.loadUser());
  }

  deleteProduct(product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    this.store.dispatch(PlatformActions.deleteProduct());
  }

  onProductDetails(product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    const productNameSplited = product.name.toLowerCase().split(' ');
    let name = '';
    productNameSplited.forEach((part, i) => {
      name += part;
      name += i !== productNameSplited.length - 1 ? '-' : '';
    });
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `product/${name}/${product.id}`,
      })
    );
  }

  initStateForEditMode(product: Product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    this.store.dispatch(
      PlatformActions.setTypeAction({ typeAction: ProductTypeAction.EDIT })
    );
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `edit-mode/${ProductTypeAction.EDIT}/${product.id}`,
      })
    );
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addProduct({ product }));
    // this._cartService.addToCart(new CartItem(product));
  }

  onChangeCategory(category) {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `products/category/${category.name}`,
      })
    );
  }
}
