import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: any = [];
  status: string = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
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
}
