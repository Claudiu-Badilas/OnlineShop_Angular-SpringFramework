import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../store/platform-state/platform.actions';
import {
  ProductTypeAction,
  UserAuthenticationAction,
} from '../product/utils/product-type-action.util';
import { Product } from 'src/app/models/product';
import * as NavigationActions from '../../store/navigation-state/navigation.actions';
import * as fromCart from '../../store/shopping-cart-state/shopping-cart.reducer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LogInComponent } from '../log-in/log-in.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnChanges {
  categories$ = this.store.select(fromPlatform.getAllCategories);
  totalQuantity$ = this.store.select(fromCart.getCartQuantity);
  cartItems$ = this.store.select(fromCart.getCartItems);
  isAdminUser$ = this.store.select(fromPlatform.getIsAdminUser);

  showButtons: boolean = true;
  bsModalRef: BsModalRef;
  userAction = UserAuthenticationAction;

  constructor(
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.checkIsUserLoggedIn();
  }

  ngOnChanges() {}

  initStateForSaveMode() {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({
        selectedProduct: new Product(null),
      })
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

  navigateToCartDetails() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `cart-details`,
      })
    );
  }

  navigateToOrders() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `my-account/orders`,
      })
    );
  }

  navigateToAccountDetails() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `my-account/edit-account`,
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
  openLoginModal(userAction: UserAuthenticationAction) {
    const config = {
      class: '',
      initialState: {},
    };
    if (userAction === UserAuthenticationAction.LOGIN) {
      this.bsModalRef = this.modalService.show(LogInComponent, config);
    } else {
      this.bsModalRef = this.modalService.show(RegisterComponent, config);
    }
  }

  logOutUser() {
    this.authenticationService.logOut();
    this.showButtons = !this.showButtons;
    window.location.reload();
  }
}
