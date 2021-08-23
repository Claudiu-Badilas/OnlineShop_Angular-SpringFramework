import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/shared/enum/role.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { ProductState } from 'src/app/components/product/product-state/product.reducer';
import * as fromProducts from '../product-state/product.reducer';
import * as fromCategories from '../category-state/category.reducer';
import * as ProductActions from '../product-state/product.actions';
import * as CategoriesActions from '../category-state/category.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  categories: Category[];
  currentCategoryId: number;
  products: Product[];
  status: string;
  showStatus: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private _cartService: CartService,
    private _authenticationService: AuthenticationService,
    private _notificationService: NotificationService,
    private store: Store<ProductState>
  ) {}

  ngOnInit(): void {
    this.checkRole();
    this.store.dispatch(ProductActions.loadProducts());

    this.store
      .select(fromProducts.getAllProducts)
      .subscribe((products) => (this.products = products));

    this.store.dispatch(CategoriesActions.loadCategories());

    this.store
      .select(fromCategories.getAllCategories)
      .subscribe((categories) => (this.categories = categories));
  }

  getProductsByCategoryType() {
    // const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    const param = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = param ? +param : 1;

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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this._notificationService.notify(
          NotificationType.SUCCESS,
          'Your selected product was deleted successfully'
        );
      },
      (error) => console.error('There was an error!', error)
    );
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.price}`);
    const theCartItem = new CartItem(product);
    this._cartService.addToCart(theCartItem);
  }

  public checkRole() {
    this.isAdmin = this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this._authenticationService.getUserFromLocalCache().role;
  }

  public searchUsers(searchTerm: string): void {
    const results: Product[] = [];
    for (const prod of this.products) {
      if (prod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(prod);
      }
    }
    // this.product = results;
    // if (results.length === 0 || !searchTerm) {
    //   this.users = this.userService.getUsersFromLocalCache();
    // }
  }
}
