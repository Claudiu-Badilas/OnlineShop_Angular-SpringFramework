import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`server/api/user/login`))
      return httpHandler.handle(httpRequest);

    if (httpRequest.url.includes(`server/api/user/register`))
      return httpHandler.handle(httpRequest);

    if (httpRequest.url.includes(`server/api/user/reset-password`))
      return httpHandler.handle(httpRequest);

    if (httpRequest.url.includes(`server/api/product/products`))
      return httpHandler.handle(httpRequest);

    if (httpRequest.url.includes(`server/api/category/categories`))
      return httpHandler.handle(httpRequest);

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return httpHandler.handle(request);
  }
}
