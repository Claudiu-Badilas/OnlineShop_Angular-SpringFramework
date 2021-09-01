import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthenticationService
  ) {}

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() =>
        this._authService.getUserFromLocalCache().pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    );
  });
}
