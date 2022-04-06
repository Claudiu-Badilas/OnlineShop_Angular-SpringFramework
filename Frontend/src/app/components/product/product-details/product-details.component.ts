import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as CartActions from '../../../store/shopping-cart-state/shopping-cart.actions';
import * as NavigationActions from '../../../store/navigation-state/navigation.actions';
import { first, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.select(fromPlatform.getSelectedProduct);

  constructor(private store: Store<AppState>) {}

  quantity: number = 1;
  totalPrice: number = 0;
  price: number = 0;

  ngOnInit(): void {
    this.product$
      .pipe(
        skipWhile((product) => product === null),
        first()
      )
      .subscribe((product) => {
        this.totalPrice = product.price;
        this.price = product.price;
      });
  }

  navigateToHome(product: Product) {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `/products/category/${product.category.name}`,
      })
    );
  }

  navigateToCart() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `/cart-details`,
      })
    );
  }

  addToCart(product: Product) {
    const products = [];
    let i = 1;
    do {
      products.push(product);
      i++;
    } while (i <= this.quantity);

    this.store.dispatch(CartActions.addMultipleProducts({ products }));
  }

  onIncrement() {
    this.quantity++;
    this.totalPrice = this.price * this.quantity;
  }

  onDecrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice = this.price * this.quantity;
    } else if (this.quantity === 1) {
      this.quantity = 1;
      this.totalPrice = this.price;
    }
  }
}
