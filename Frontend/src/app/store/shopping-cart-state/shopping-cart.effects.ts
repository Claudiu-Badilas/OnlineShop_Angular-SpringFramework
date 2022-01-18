import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromCart from './shopping-cart.reducer';
import * as fromCartActions from './shopping-cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CartItem } from 'src/app/models/cart-item';

@Injectable()
export class ShoppingCartEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCartActions.addProduct),
      withLatestFrom(this.store.select(fromCart.getCartItems)),
      map(([action, items]) => {
        let isAlreadyInCart: boolean = false;
        if (items.length > 0) {
          items = items.map((item) => {
            if (item.product.id === action.product.id) {
              isAlreadyInCart = true;
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        }

        if (!isAlreadyInCart) {
          items = [...items, new CartItem(action.product)];
        }

        return fromCartActions.changeCartItems({ items });
      })
    );
  });
}
