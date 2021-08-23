import { NotificationModule } from './shared/Notification/notification.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from './authentication/interceptor/auth.interceptor';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { OrderProductService } from './services/orderProduct.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { NotificationService } from './services/notification.service';
import { RegisterComponent } from './components/register/register.component';
import * as fromApp from './store/app.state';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AuthenticationGuard } from './authentication/guard/authentication.guard';
import { ProductEffects } from './components/product/product-state/product.effects';
import { CategoryEffects } from './components/product/category-state/category.effects';

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
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ProductEffects, CategoryEffects]),
    NgbModule,
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
