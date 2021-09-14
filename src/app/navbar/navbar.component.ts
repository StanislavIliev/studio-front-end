import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { authLogout } from '../auth/state/auth.actions';
import { isAuthenticated } from '../auth/state/auth.selector';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean=false;
  
  constructor(private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.store.select(isAuthenticated).subscribe((bbb) => {
      this.isLogged=bbb;
    })
  }

  logout() {
    this.store.dispatch(authLogout());
  }

}
