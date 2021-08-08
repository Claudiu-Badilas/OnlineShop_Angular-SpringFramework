import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  categories: any = [];
  currentCategoryId: number;
  products: any = [];
  status: string;
  showStatus: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(() => {
    //   this.getProductsByCategoryType();
    // });
    // this.route.paramMap.subscribe(() => {
    //   this.getCategories();
    // });
  }

  getProductsByCategoryType() {
    // const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    const param = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = param ? +param : 0;

    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Products successfully found!')
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.status = 'Delete successfully';
        console.log(this.status);
        this.showStatus = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => console.error('There was an error!', error)
    );
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.price}`);
    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Categories successfully found!')
    );
  }
}
