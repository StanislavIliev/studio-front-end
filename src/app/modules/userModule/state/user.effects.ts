import { Injectable } from "@angular/core";
import { Actions, createEffect , ofType } from "@ngrx/effects";
import { userUpdateStart , userUpdateSuccess } from "./user.actions";
import { AuthService } from '../../../services/auth.service';
import { map , switchMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";


@Injectable()
export class UserEffects{

  constructor(
    private actions$ : Actions,
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
    ){}

  updateUser$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(userUpdateStart),
  switchMap((action) => {
    console.log(action.updatedUser);
    return this.authService.updateUser(action.updatedUser).pipe(map((data) => {
      this.router.navigate(['/']);
      console.log(data);
      localStorage.setItem('userData', JSON.stringify(data));
     return userUpdateSuccess({ message: 'Success' , updatedUser: action.updatedUser });
    })
    );
  })
  );
   });

}
