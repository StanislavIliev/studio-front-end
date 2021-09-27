import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { requestPaswordStart } from '../state/auth.actions';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  
  requestResetForm: FormGroup;
  forbiddenEmails: any;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.requestResetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  requestResetUser(): any {
      const auth: User = {...this.requestResetForm.value};
      this.store.dispatch(requestPaswordStart({ auth }));
  }

}
