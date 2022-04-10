import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../../../models/product';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../../store/platform-state/platform.actions';
import * as NavigationActions from '../../../store/navigation-state/navigation.actions';
import { AppState } from 'src/app/store/app.state';
import { ProductTypeAction } from '../utils/product-type-action.util';
import * as CartActions from '../../../store/shopping-cart-state/shopping-cart.actions';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$ = this.store.select(fromPlatform.getAllProductsByCategory);
  categories$ = this.store.select(fromPlatform.getAllCategories);
  selectedCategory$ = this.store.select(fromPlatform.getSelectedCategory);
  isLoading$ = this.store.select(fromPlatform.getSpinnerLoading);
  isAdminUser$ = this.store.select(fromPlatform.getIsAdminUser);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  changedCategory(category: Category) {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `products/category/${category.name}`,
      })
    );
  }

  onViewDetails(product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    const name = product.name.toLowerCase().replaceAll(' ', '-');
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `product/${name}/${product.id}`,
      })
    );
  }

  onAddToCart(product: Product) {
    this.store.dispatch(
      CartActions.addMultipleProducts({ products: [product] })
    );
  }

  onEdit(product: Product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    this.store.dispatch(
      PlatformActions.setTypeAction({ typeAction: ProductTypeAction.EDIT })
    );
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `edit-mode/${ProductTypeAction.EDIT}/${product.id}`,
      })
    );
  }

  onDelete(product) {
    this.store.dispatch(
      PlatformActions.changeSelectedProduct({ selectedProduct: product })
    );
    this.store.dispatch(PlatformActions.deleteProduct());
  }
}
