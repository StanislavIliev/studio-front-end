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
  updatedUser: User;
  username: string;
  allUsers: User[] = [];


  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private actionsListener$: ActionsSubject

  ) {
  }

  ngOnInit(): void {

    this.actionsListener$
      .pipe(ofType(GET_ALL_USERS_SUCCESS))
      .subscribe((data: any) => {
        this.allUsers = data.users;
        this.getLoggedUser();
      });

  }


  getLoggedUser(){
    this.username = sessionStorage.getItem('username');
    console.log(this.username);
    this.updatedUser = this.allUsers.find(user => user.username === this.username);
    this.updateUsersForm();

}

updateUsersForm(){
     this.updateUserForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl('')
    });

  }
  
  onUpdateUser(): any {
    if (!this.updateUserForm.valid) {
      return;
    }

     let updatedUser: User = { ...this.updateUserForm.value };
  // this.store.dispatch(userUpdateStart({ updatedUser : User }));
}

}