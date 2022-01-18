import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: any = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.product.id === theCartItem.product.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      alreadyExistsInCart = existingCartItem != undefined;
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue +=
        currentCartItem.quantity * currentCartItem.product.price;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.product.id === cartItem.product.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
