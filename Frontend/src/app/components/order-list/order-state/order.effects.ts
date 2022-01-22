import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrderActions from './order.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as PlatformActions from '../../../store/platform-state/platform.actions';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';

@Injectable()
export class OrderEffects {
  user: User;

  constructor(
    private actions$: Actions,
    private _orderService: OrderService,
    private store: Store<AppState>
  ) {
    this.store.select(fromPlatform.getUser).subscribe((user) => {
      this.user = user;
    });
  }

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() =>
        this._orderService.getOrdersByUserId(+this.user.id).pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrderActions.loadOrdersFailure({ error })))
        )
      )
    )
  );
}
