import { PlatformEffects } from './store/platform-state/platform.effects';
import { NotificationModule } from './shared/Notification/notification.module';
import { AppRoutingModule } from './app.routing';
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
import { OrderListComponent } from './components/user-dashboard/order-list/order-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NotificationService } from './services/notification.service';
import { RegisterComponent } from './components/register/register.component';
import * as fromApp from './store/app.state';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AuthenticationGuard } from './authentication/guard/authentication.guard';
import {
  NgxLoadingXConfig,
  POSITION,
  SPINNER,
  NgxLoadingXModule,
} from 'ngx-loading-x';
import { NavigationEffects } from './store/navigation-state/navigation.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './store/navigation-state/router-serializer';
import { ShoppingCartEffects } from './store/shopping-cart-state/shopping-cart.effects';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product/product.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './services/confirm.service';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EditAccountDetailsComponent } from './components/user-dashboard/edit-account-details/edit-account-details.component';

const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 0,
  bgOpacity: 1,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 50,
  spinnerType: SPINNER.circleSpinner,
  spinnerSize: 100,
  spinnerColor: '#dd0031',
  spinnerPosition: POSITION.centerCenter,
};

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
    CategoryComponent,
    ProductComponent,
    DropdownComponent,
    ConfirmDialogComponent,
    UserDashboardComponent,
    EditAccountDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      PlatformEffects,
      NavigationEffects,
      ShoppingCartEffects,
    ]),
    NgbModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    ModalModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    ProductService,
    OrderService,
    UserService,
    CategoryService,
    AuthenticationGuard,
    NotificationService,
    ConfirmService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
