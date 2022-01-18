import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../store/platform-state/platform.actions';
import { ProductTypeAction } from '../product/utils/product-type-action.util';
import { Product } from 'src/app/models/product';
import * as NavigationActions from '../../store/navigation-state/navigation.actions';
import * as fromCart from '../../store/shopping-cart-state/shopping-cart.reducer';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnChanges {
  categories$ = this.store.select(fromPlatform.getAllCategories);
  totalQuantity$ = this.store.select(fromCart.getCartQuantity);
  cartItems$ = this.store.select(fromCart.getCartItems);

  showButtons: boolean = true;
  public user: User = new User();

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.user = this.authenticationService.getUserFromLocalCache();

    this.checkIsUserLoggedIn();
  }

  ngOnChanges() {}

  initStateForSaveMode() {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: new Product() })
    );
    this.store.dispatch(
      PlatformActions.setTypeAction({ typeAction: ProductTypeAction.SAVE })
    );
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `edit-mode/${ProductTypeAction.SAVE}/0`,
      })
    );
  }

  checkIsUserLoggedIn() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.showButtons = !this.showButtons;
    }
  }

  onChangeCategory(category) {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `products/category/${category.name}`,
      })
    );
  }

  logOutUser() {
    this.authenticationService.logOut();
    this.showButtons = !this.showButtons;
    window.location.reload();
  }
}
