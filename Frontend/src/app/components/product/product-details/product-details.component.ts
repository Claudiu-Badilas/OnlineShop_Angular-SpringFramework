import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as CartActions from '../../../store/shopping-cart-state/shopping-cart.actions';
import * as NavigationActions from '../../../store/navigation-state/navigation.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.select(fromPlatform.getSelectedProduct);

  constructor(private store: Store<AppState>) {}

  quantity: number = 1;

  ngOnInit(): void {}

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
    const products = [product, product];
    console.log('🚀 products', products);
    this.store.dispatch(
      CartActions.addMultipleProducts({ products: products })
    );
  }

  onIncrement() {}

  onDecrement() {}
}
