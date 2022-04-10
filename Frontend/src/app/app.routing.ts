import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { OrderListComponent } from './components/user-dashboard/order-list/order-list.component';
import { AuthenticationGuard } from './authentication/guard/authentication.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EditAccountDetailsComponent } from './components/user-dashboard/edit-account-details/edit-account-details.component';

const routes: Routes = [
  { path: 'products/category/:categoryName', component: ProductListComponent },
  {
    path: 'product/:productName/:productId',
    component: ProductDetailsComponent,
  },
  { path: 'cart-details', component: CartDetailsComponent },

  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'edit-mode/:actionType/:productId',
    component: EditProductComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'my-account',
    component: UserDashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'orders',
        component: OrderListComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'edit-account',
        component: EditAccountDetailsComponent,
        canActivate: [AuthenticationGuard],
      },
    ],
  },
  { path: '', redirectTo: 'products/category/Ovaz', pathMatch: 'full' },
  { path: '**', redirectTo: 'products/category/Ovaz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
