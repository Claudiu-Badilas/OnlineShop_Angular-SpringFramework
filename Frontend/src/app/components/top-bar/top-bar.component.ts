import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnChanges {
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
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // this.user = this.authenticationService.getUserFromLocalCache();
    this.updateCartStatus();
    // this.route.paramMap.subscribe(() => {
    //   this.getCategories();
    // });
    this.checkIsUserLoggedIn();
  }

  ngOnChanges() {}

  private updateCartStatus() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Categories successfully found!')
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
