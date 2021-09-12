import { Component, OnInit  } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthResponse } from 'src/app/models/auth.responsible';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  onLogin(): void {
      const auth: AuthResponse = {...this.loginForm.value};

     this.store.dispatch(loginStart({ auth }));
    }

}
