import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/order";

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(){
    return this.httpClient.get('/server/api/orders');
  }

  getOrdersByUserId(id: number){
    return this.httpClient.get('/server/api/findOrderByUserId/' + id);
  }

  createOrder(order: Order) {
    let body = JSON.stringify(order);
    return this.httpClient.post('/server/api/saveOrder', body, httpOption);
  }

  deleteOrder(id: number) {
    return this.httpClient.delete('/server/api/deleteOrderById/' + id);
  }
}
