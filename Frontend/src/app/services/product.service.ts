import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`/server/product/products`)
      .pipe(
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

  getProductById(id: number) {
    return this.http.get(`/server/product/${id}`);
  }

  getProductsByCategory(id: number) {
    return this.http.get<Product[]>(`/server/product/category/${id}`);
  }

  createProduct(product: Product) {
    let body = JSON.stringify(product);
    return this.http.post(`/server/product/save`, body, httpOption);
  }

  updateProduct(id: number, product: Product) {
    let body = JSON.stringify(product);
    return this.http.put(`/server/product/update/${id}`, body, httpOption);
  }

  deleteProduct(id: number) {
    return this.http.delete(`/server/product/delete/${id}`);
  }
}
