import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../../store/platform-state/platform.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$ = this.store.select(fromPlatform.getAllOrders);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
