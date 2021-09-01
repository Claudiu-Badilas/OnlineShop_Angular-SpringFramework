import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/serve/orders/orders');
  }

  getOrdersByUserId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/server/user-orders/' + id);
  }

  saveOrder(order: Order) {
    const body = JSON.stringify(order);
    return this.httpClient.post('/server/order/save', body, httpOption);
  }

  deleteOrder(id: number) {
    return this.httpClient.delete('/server/order/deleteOrderById/' + id);
  }
}
