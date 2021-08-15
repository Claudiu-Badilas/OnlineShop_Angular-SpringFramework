import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../models/category';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get('/server/category/categories');
  }

  createCategory(category: Category) {
    let body = JSON.stringify(category);
    return this.httpClient.post('/server/category/add', body, httpOption);
  }
}
