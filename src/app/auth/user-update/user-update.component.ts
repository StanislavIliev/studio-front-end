import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { User } from '../../models/user';
import {  Store, ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { GET_ALL_USERS_SUCCESS, userUpdateStart } from '../state/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  updateUserForm: FormGroup;
  updatingUser: User;
  id: string;


  constructor(
    private store: Store<AppState>,
    private authService: AuthService
      ) {
  }

  ngOnInit(): void {
       this.getLoggedUser();
        this.updateUsersForm();

  }


  getLoggedUser(){
   const userDataString = localStorage.getItem('userData'); 
        this.updatingUser = JSON.parse(userDataString);
//        console.log(this.updatedUser);
        return this.updatingUser;

}

updateUsersForm(){
     this.updateUserForm = new FormGroup({
       username : new FormControl(this.updatingUser.username),
       id: new FormControl(this.updatingUser.id),
      firstName: new FormControl(this.updatingUser.firstName),
      lastName: new FormControl(this.updatingUser.lastName),
      phoneNumber: new FormControl(this.updatingUser.phoneNumber)
    });

  }
  
  onUpdateUser(): any {
    if (!this.updateUserForm.valid) {
      return;
    }

    const firstName = this.updateUserForm.value.firstName;
    const lastName = this.updateUserForm.value.lastName;
    const phoneNumber = this.updateUserForm.value.phoneNumber;

    const updatedUser: User = {
      id: this.updatingUser.id,
      username: this.updatingUser.username,
      firstName,
      lastName,
      phoneNumber
    };
    
   // let updatedUser: User = { ...this.updateUserForm.value };
    console.log(updatedUser);
   this.store.dispatch(userUpdateStart({ updatedUser }));
}

}