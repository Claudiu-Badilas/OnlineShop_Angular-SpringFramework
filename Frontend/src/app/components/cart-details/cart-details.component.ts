import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/user';
import { OrderProductService } from '../../services/orderProduct.service';

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
  validMessage: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private orderProductService: OrderProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
    this.getOrders();

    this.orderForm = new FormGroup({
      date: new FormControl(this.getCurrentDateAndTime(), Validators.required),
      totalPrice: new FormControl(this.totalPrice, Validators.required),
      status: new FormControl('pending', Validators.required),
      //user: new FormControl(new User(2, "test", "test", "USER")),
      user: new FormControl(null),
    });

    this.orderProductsForm = new FormGroup({
      orderId: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required),
    });
  }

  getCurrentDateAndTime() {
    let currentDate = new Date().toISOString().slice(0, 10);
    let d = new Date(),
      h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
      s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    let currentHour = h + ':' + m + ':' + s;
    return currentDate + ' ' + currentHour;
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

  createOrder() {
    if (this.orderForm.valid) {
      this.validMessage = 'Your order was successfully saved!';
      console.log(this.orderForm.value);
      this.orderService.createOrder(this.orderForm.value).subscribe(
        (data) => {
          this.orderForm.reset(data);
          return true;
        },
        (error) => {
          console.error(error);
        },
        () => console.log('Order successfully placed!')
      );
      this.setOrderProducts();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      this.validMessage = 'Please fill out customer details!';
    }
  }

  //========set product to order just placed=============================================
  setOrderProducts() {
    for (let i = 0; i < this.cartItems.length; i++) {
      console.log(i);
      // if (this.orderProductsForm.valid) {
      this.validMessage = 'Product successfully saved to order!';
      const payload = this.orderProductsForm.value;

      payload.productId = this.cartItems[i].id;
      let id = this.orders[this.orders.length - 1].id;
      payload.orderId = id + 1;
      console.log('payload.productId ' + payload.productId);
      console.log('payload.orderId ' + payload.orderId);
      console.log(this.orderProductsForm.value);
      this.orderProductService
        .createOrderProduct(this.orderProductsForm.value)
        .subscribe(
          (data) => {
            this.orderProductsForm.reset(data);
            return true;
          },
          (error) => {
            console.error(error);
          },
          () => console.log('Product successfully added to order!')
        );
    }
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Products successfully found!')
    );
  }
}
