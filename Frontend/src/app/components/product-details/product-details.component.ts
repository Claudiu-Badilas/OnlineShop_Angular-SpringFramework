import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductById(this.route.snapshot.params.id);
  }

  private getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Product successfully found!')
    );
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.price}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
