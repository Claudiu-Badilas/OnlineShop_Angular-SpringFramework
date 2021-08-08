import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'productsCategory/:id', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'login', component: LogInComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'saveProduct', component: AddProductComponent },
  { path: 'updateProduct/:id', component: EditProductComponent },
  { path: 'orders/:id', component: OrderListComponent },
  { path: '', redirectTo: 'productsCategory/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'productsCategory/1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
