import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { userUpdateStart } from '../state/user.actions';

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
    private store: Store<AppState>
    ) {
  }

  ngOnInit(): void {
      this.getLoggedUser();
      this.updateUsersForm();
  }

  getLoggedUser(){
  const userDataString = localStorage.getItem('userData'); 
  this.updatingUser = JSON.parse(userDataString);
  return this.updatingUser;
}

updateUsersForm(){
     this.updateUserForm = new FormGroup({
       username : new FormControl(this.updatingUser.username),
       id: new FormControl(this.updatingUser.id),
      firstName: new FormControl(this.updatingUser.firstName, [Validators.required, Validators.pattern('[A-Za-z]+')]),
      lastName: new FormControl(this.updatingUser.lastName, [Validators.required, Validators.pattern('[A-Za-z]+')]),
      phoneNumber: new FormControl(this.updatingUser.phoneNumber, [Validators.required, Validators.pattern('[+,0-9]+')])
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
    console.log(updatedUser);
     this.store.dispatch(userUpdateStart({ updatedUser }));
}

}