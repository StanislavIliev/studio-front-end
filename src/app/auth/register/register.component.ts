import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { User } from '../../models/user';
import { registerStart } from '../state/auth.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
   
  registerForm: FormGroup;
  user: User;

  constructor(
        private store: Store<AppState>
   ){
 }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9]+')]),
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z]+')]),
      lastName: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z]+')]),
      phoneNumber: new FormControl('' , [Validators.required, Validators.pattern('[+,0-9]+')])
    });
   }
  
  onRegister(){
    const user: User = { ...this.registerForm.value };
    this.store.dispatch(registerStart({ user: user }));
  }
  
}
