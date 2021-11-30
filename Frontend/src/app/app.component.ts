import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as fromPlatform from './store/platform-state/platform.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Frontend';

  constructor(private store: Store<AppState>) {}

  isLoading$ = this.store.select(fromPlatform.getSpinnerLoading);

  ngOnInit(): void {}
}
