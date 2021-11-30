import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../store/platform-state/platform.actions';
import { ProductTypeAction } from '../product/utils/product-type-action.util';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnChanges {
  categories$ = this.store.select(fromPlatform.getAllCategories);

  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  categories: any;
  showButtons: boolean = true;
  public user: User = new User();

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.user = this.authenticationService.getUserFromLocalCache();

    this.updateCartStatus();

    this.checkIsUserLoggedIn();
  }

  ngOnChanges() {}

  initStateForSaveMode() {
    this.store.dispatch(
      PlatformActions.setCurrentProduct({
        setCurrentProduct: new Product(),
      })
    );
    this.store.dispatch(
      PlatformActions.setTypeAction({ typeAction: ProductTypeAction.SAVE })
    );
  }

  private updateCartStatus() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  getCartItems() {
    this.cartItems = this.cartService.cartItems;
  }

  checkIsUserLoggedIn() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.showButtons = !this.showButtons;
    }
  }

  logOutUser() {
    this.authenticationService.logOut();
    this.showButtons = !this.showButtons;
    window.location.reload();
  }
}
