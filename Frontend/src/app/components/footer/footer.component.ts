import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../store/platform-state/platform.reducer';
import * as NavigationActions from '../../store/navigation-state/navigation.actions';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  categories$ = this.store.select(fromPlatform.getAllCategories);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onChangeCategory(category) {
    this.store.dispatch(
      NavigationActions.navigateTo({
        route: `products/category/${category.name}`,
      })
    );
  }
}
