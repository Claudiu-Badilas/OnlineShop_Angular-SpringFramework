import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders() {
    return this.httpClient.get('/serve/orders/orders');
  }

  getOrdersByUserId(id: number) {
    return this.httpClient.get('/server/user-orders/' + id);
  }

  saveOrder(order: Order) {
    const body = JSON.stringify(order);
    return this.httpClient.post('/server/order/save', body, httpOption);
  }

  deleteOrder(id: number) {
    return this.httpClient.delete('/server/order/deleteOrderById/' + id);
  }
}
