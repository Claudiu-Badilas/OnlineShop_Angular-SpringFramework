import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { OrderService } from '../../services/order.service';
import { OrderProductService } from '../../services/orderProduct.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: any = [];
  status: string = '';
  orderProducts: any = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private orderProductService: OrderProductService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersByUserId(1).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Products successfully found!')
    );
    this.orders.reverse();
  }

  cleanTrashOrders() {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].products.length === 0) {
        this.orderService.deleteOrder(this.orders[i].id).subscribe(
          (data) => {
            this.status =
              'Delete successfully order with id' + this.orders[i].id;
            console.log(this.status);
          },
          (error) => console.error('There was an error!', error)
        );
      }
    }
    console.log('No longer trash orders!');
  }

  deleteOrder(order: Order) {
    console.log(order);
    for (let i = 0; i < order.products.length - 1; i++) {
      this.getOrderProducts(order.id, order.products[i].id);
      console.log(this.orderProducts);
      for (let j = 0; j < this.orderProducts.length - 1; j++) {
        this.orderProductService
          .deleteOrderProduct(this.orderProducts[j].id)
          .subscribe(
            () => {
              this.status = 'Delete successfully';
            },
            (error) => console.error('There was an error!', error)
          );
      }
    }

    this.orderService.deleteOrder(order.id).subscribe(
      () => {
        this.status = 'Delete successfully';
        console.log('Delete order with id ' + order.id);
      },
      (error) => console.error('There was an error!', error)
    );
  }

  getOrderProducts(orderId: number, productId: number): any {
    this.orderProductService.getOrderProducts(orderId, productId).subscribe(
      (data) => {
        return (this.orderProducts = data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('OrderProducts successfully found!')
    );
  }
}
