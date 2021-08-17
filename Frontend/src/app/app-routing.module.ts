import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/category/:id', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  {
    path: 'orders/:id',
    component: OrderListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'add',
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
