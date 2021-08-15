import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(`/server/product/products`);
  }

  getProductById(id: number) {
    return this.httpClient.get(`/server/product/${id}`);
  }

  getProductsByCategory(id: number) {
    return this.httpClient.get(`/server/product/category/${id}`);
  }

  createProduct(product: Product) {
    let body = JSON.stringify(product);
    return this.httpClient.post(`/server/product/save`, body, httpOption);
  }

  updateProduct(id: number, product: Product) {
    let body = JSON.stringify(product);
    return this.httpClient.put(
      `/server/product/update/${id}`,
      body,
      httpOption
    );
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`/server/product/delete/${id}`);
  }
}
