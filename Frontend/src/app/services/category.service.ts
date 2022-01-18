import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../models/category';
import { map } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>('/server/api/category/categories')
      .pipe(
        map((results) =>
          results.map((result) => new Category(result.id, result.name))
        )
      );
  }

  createCategory(category: Category) {
    let body = JSON.stringify(category);
    return this.httpClient.post('/server/api/category/add', body, httpOption);
  }
}
