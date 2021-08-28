import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

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
    this.cartService.addToCart(new CartItem(this.product));
  }
}
