import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { responsePasswordStart } from '../state/auth.actions';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  responseResetForm: FormGroup;

  constructor(
    private router: Router,
    private store: Store<AppState>
    ) {
  }


   ngOnInit(): any {
    this.responseResetForm = new FormGroup({
        newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
  }

  validate(form: FormGroup): any {
    const new_password = form.controls.newPassword.value;
    const confirm_password = form.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }
    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }


  resetPassword(): any {
    const auth: User = {};
    auth.password = this.responseResetForm.value.newPassword;
    auth.uniqueString = this.router.url.split('/').pop();
    this.store.dispatch(responsePasswordStart({ auth }));
  }
}
