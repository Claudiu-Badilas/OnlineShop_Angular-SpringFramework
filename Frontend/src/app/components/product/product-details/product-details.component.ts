import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store/app.state';
import * as fromProduct from './../product-state/product.reducer';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  product$: Observable<Product>;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.product$ = this.store.select(fromProduct.getCurrentProduct);
    this.product$.subscribe((product) => {
      this.product = product;
    });
  }

  addToCart() {
    this.cartService.addToCart(new CartItem(this.product));
  }
}
