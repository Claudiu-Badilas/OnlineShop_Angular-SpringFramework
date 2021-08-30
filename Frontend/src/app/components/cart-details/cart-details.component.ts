import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as ProductActions from 'src/app/components/product/product-state/product.actions';
import * as fromProducts from 'src/app/components/product/product-state/product.reducer';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  //========cart
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  orders: any = [];

  //=======post
  orderForm: FormGroup;
  orderProductsForm: FormGroup;
  products$: Observable<Product[]>;
  products: Product[];
  user: User;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getCartProducts();

    this.user = this.authService.getUserFromLocalCache();

    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(fromProducts.getAllProducts);

    this.products$.subscribe((products) => {
      this.products = products;
    });

    this.orderForm = this.formBuilder.group({
      date: [null, Validators.required],
      totalPrice: [null, Validators.required],
      status: ['', Validators.required],
      user: [null, Validators.required],
      products: [null, Validators.required],
    });
  }

  saveOrder() {
    const payload = this.orderForm.value;

    payload.date = moment().toDate();
    payload.totalPrice = 19;
    payload.status = 'pending';
    payload.products = this.products;
    payload.user = this.user;

    console.log(this.orderForm.value);
    this.orderService.saveOrder(this.orderForm.value);
  }

  getCartProducts() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
