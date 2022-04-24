import { Component, OnInit } from '@angular/core';
import * as NavigationActions from '../../store/navigation-state/navigation.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  navigateToOrders() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `my-account/orders`,
      })
    );
  }

  navigateToAccountDetails() {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `my-account/edit-account`,
      })
    );
  }

  logOutUser() {
    this.authenticationService.logOut();
    window.location.reload();
  }
}
