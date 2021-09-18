import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  updateUserForm: FormGroup;
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.updateUserForm = new FormGroup({
      username: new FormControl(this.user.username),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      phoneNumber: new FormControl(this.user.phoneNumber)
    });
  }


  onUpdateUser(): void {
    this.user = {...this.updateUserForm.value};
    this.authService.updateUser(this.user)
      .subscribe((response) => {
        this.authService.addUserToLocalCache(response);

        this.router.navigate(['/']);
      });

  }

}

