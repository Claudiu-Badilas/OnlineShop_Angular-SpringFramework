import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { HeaderType } from 'src/app/shared/enum/header-type.enum';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router // private notificationService: NotificationService // private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // // if (this.authenticationService.isUserLoggedIn()) {
    //   this.router.navigateByUrl('/user/management');
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
  }

  public onLogin(user: User): void {
    //   this.showLoading = true;
    //   this.subscriptions.push(
    //     this.authenticationService.login(user).subscribe(
    //       (response: HttpResponse<User>) => {
    //         const token = response.headers.get(HeaderType.JWT_TOKEN);
    //         this.authenticationService.saveToken(token);
    //         this.authenticationService.addUserToLocalCache(response.body);
    //         this.router.navigateByUrl('/user/management');
    //         this.showLoading = false;
    //       },
    //       (errorResponse: HttpErrorResponse) => {
    //         // this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
    //         this.showLoading = false;
    //       }
    //     )
    //   );
  }

  // private sendErrorNotification(notificationType: NotificationType, message: string): void {
  //   if (message) {
  //     this.notificationService.notify(notificationType, message);
  //   } else {
  //     this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  //   }
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
