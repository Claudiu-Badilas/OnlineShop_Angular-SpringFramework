import { NotificationModule } from './shared/Notification/notification.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { OrderProductService } from './services/orderProduct.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationService } from './services/notification.service';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    CartDetailsComponent,
    EditProductComponent,
    FooterComponent,
    LogInComponent,
    OrderListComponent,
    ProductDetailsComponent,
    ProductListComponent,
    RegisterComponent,
    TopBarComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    AuthenticationService,
    ProductService,
    OrderService,
    UserService,
    CategoryService,
    OrderProductService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationGuard,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
