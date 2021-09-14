import { getLoading, getErrorMessage } from './store/Shared/shared.selector';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLoginStart } from './auth/state/auth.actions';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'studio-front';
  private readonly notifier: NotifierService;
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private norifierService: NotifierService
    ) {
      this.notifier = norifierService;
    }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLoginStart());
  }
}
