import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { CartItem } from '../../models/cart-item';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Product } from 'src/app/models/product';
import * as fromPlatform from '../../store/platform-state/platform.reducer';
import * as fromCart from '../../store/shopping-cart-state/shopping-cart.reducer';
import * as PlatformActions from '../../store/platform-state/platform.actions';
import * as CartActions from './../../store/shopping-cart-state/shopping-cart.actions';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  //========cart
  cartItems$ = this.store.select(fromCart.getCartItems);

  cartItems;
  totalPrice$ = this.store.select(fromCart.getCartPrice);
  totalQuantity$ = this.store.select(fromCart.getCartQuantity);
  orders: any = [];

  //=======post
  orderForm: FormGroup;
  detailsForm: FormGroup;
  products$: Observable<Product[]>;
  products: Product[];
  user: User;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(fromPlatform.getUser).subscribe((user) => {
      this.user = user;
    });

    this.products$ = this.store.select(fromPlatform.getAllProducts);

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

  onSaveOrder() {
    this.orderForm.value.date = moment().utc();
    this.orderForm.value.totalPrice = 19;
    this.orderForm.value.status = 'pending';
    this.orderForm.value.products = this.products;
    this.orderForm.value.user = this.user;

    console.log(this.orderForm.value);
    this.orderService.saveOrder(this.orderForm.value);
  }

  onIncrement(cartItem: CartItem) {
    this.store.dispatch(
      CartActions.addMultipleProducts({ products: [cartItem.product] })
    );
  }

  onDecrement(cartItem: CartItem) {
    this.store.dispatch(
      CartActions.decreaseProduct({ product: cartItem.product })
    );
  }

  remove(cartItem: CartItem) {
    this.store.dispatch(
      CartActions.removeProduct({ product: cartItem.product })
    );
  }

  onRemoveCartItems() {
    this.store.dispatch(CartActions.removeAllCartItems());
  }

  submitDetails(form) {}
}
