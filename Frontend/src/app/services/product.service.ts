import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`/server/api/product/products`).pipe(
      first(),
      map((results) =>
        results.map(
          (result) =>
            new Product(
              result.id,
              result.name,
              result.description,
              result.price,
              result.image,
              result.category
            )
        )
      )
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/server/api/product/${id}`);
  }

  getProductsByCategory(id: number) {
    return this.http.get<Product[]>(`/server/api/product/category/${id}`);
  }

  saveProduct(product: Product) {
    let body = JSON.stringify(product);
    return this.http.post(`/server/api/product/save`, body, httpOption);
  }

  editProduct(product: Product) {
    let body = JSON.stringify(product);
    return this.http.put<Product>(
      `/server/api/product/update/${product.id}`,
      body,
      httpOption
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/server/api/product/delete/${id}`);
  }
}
