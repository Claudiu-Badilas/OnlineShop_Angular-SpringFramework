import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.select(fromPlatform.getSelectedProduct);

  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    //  this.cartService.addToCart(new CartItem(product));
  }
}
