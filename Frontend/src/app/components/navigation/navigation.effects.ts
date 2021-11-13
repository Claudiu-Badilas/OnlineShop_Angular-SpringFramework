import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NavigationActions from './navigation.actions';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class NavigationEffects {
  user: User;

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  changeRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.goTo),
      map((action) => {
        this.router.navigate([action.route]);
        return null;
      })
    )
  );
}
