import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { AppState } from 'src/app/store/app.state';
import * as OrderActions from './order-state/order.actions';
import * as fromOrder from './order-state/order.reducer';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
    this.orders$ = this.store.select(fromOrder.getAllOrders);

    this.errorMessage$ = this.store.select(fromOrder.getError);
  }
}
