import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrderProduct} from "../models/order-product";

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
  constructor(private httpClient: HttpClient) {
  }

  createOrderProduct(orderProduct: OrderProduct) {
    let body = JSON.stringify(orderProduct);
    return this.httpClient.post('/server/api/saveOrderProduct/', body, httpOption);
  }

  getOrderProducts(orderId: number, productId: number) {
    return this.httpClient.get('server/api/orderProduct/' + orderId + '_' + productId);
  }

  deleteOrderProduct(id: number) {
    return this.httpClient.delete('/server/api/deleteOrderProducts/' + id);
  }
}
