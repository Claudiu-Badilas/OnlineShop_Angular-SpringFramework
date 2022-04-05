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
    return this.httpClient.get<Order[]>(`/server/orders/orders`);
  }

  getOrdersByUserId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`/server/api/order/user-orders/${id}`);
  }

  saveOrder(order: Order) {
    const body = JSON.stringify(order);
    return this.httpClient.post(`/server/api/order/save`, order, httpOption);
  }

  deleteOrder(id: number) {
    return this.httpClient.delete(`/server/api/order/deleteOrderById/${id}`);
  }
}
