import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as CartActions from '../../../store/shopping-cart-state/shopping-cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.select(fromPlatform.getSelectedProduct);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addProduct({ product }));
  }
}
