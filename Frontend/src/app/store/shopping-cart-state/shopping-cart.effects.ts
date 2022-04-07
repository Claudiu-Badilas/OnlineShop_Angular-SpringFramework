import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromCart from './shopping-cart.reducer';
import * as fromCartActions from './shopping-cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CartItem } from 'src/app/models/cart-item';
import { EMPTY } from 'rxjs';

@Injectable()
export class ShoppingCartEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCartActions.addMultipleProducts),
      withLatestFrom(this.store.select(fromCart.getCartItems)),
      map(([action, items]) => {
        let isAlreadyInCart: boolean = false;
        action.products.forEach((product) => {
          if (items.length > 0) {
            items = items.map((item) => {
              if (item.product.id === product.id) {
                isAlreadyInCart = true;
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          }

          if (!isAlreadyInCart) {
            items = [...items, new CartItem(product)];
          }
        });
        this.updateComputeCartTotals(items);
        return fromCartActions.changeCartItems({ items });
      })
    );
  });

  decreaseProductFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[fromCartActions.decreaseProduct]),
      withLatestFrom(this.store.select(fromCart.getCartItems)),
      map(([action, items]) => {
        if (items.length > 0) {
          items = items.map((item) => {
            if (item.product.id === action.product.id) {
              if (item.quantity === 1) {
                this.store.dispatch(
                  fromCartActions.removeProduct({ product: item.product })
                );
              }
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        }
        this.updateComputeCartTotals(items);
        return fromCartActions.changeCartItems({ items });
      })
    );
  });

  removeProductFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[fromCartActions.removeProduct]),
      withLatestFrom(this.store.select(fromCart.getCartItems)),
      map(([action, items]) => {
        const itemIndex = items.findIndex(
          (item) => item.product.id === action.product.id
        );
        const copiedItems = items.slice();
        if (itemIndex > -1) copiedItems.splice(itemIndex, 1);

        this.updateComputeCartTotals(items);
        return fromCartActions.changeCartItems({ items: copiedItems });
      })
    );
  });

  updateComputeCartTotals(items: CartItem[]) {
    const allPrices = items.map((item) => item.product.price * item.quantity);
    const totalPrice = allPrices.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    const allQuantities = items.map((item) => item.quantity);
    const totalQuantities = allQuantities.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
    this.store.dispatch(
      fromCartActions.changeComputeCartTotals({
        price: totalPrice,
        quantity: totalQuantities,
      })
    );
  }
}
