import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './authentication/guard/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/category/:categoryName', component: ProductListComponent },
  {
    path: 'product/:productName/:productId',
    component: ProductDetailsComponent,
  },
  { path: 'cart-details', component: CartDetailsComponent, children: [] },
  {
    path: 'orders/:id',
    component: OrderListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
