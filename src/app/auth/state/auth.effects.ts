import { Injectable } from "@angular/core";
import { Actions, createEffect , ofType } from "@ngrx/effects";
import { autoLoginStart,autoLoginSuccess,autoLoginFail, authLogout,
   loginStart, loginSuccess, registerStart, registerSuccess, responsePasswordFail, getAllUsersSuccess , 
     responsePasswordStart, responsePasswordSuccess ,userUpdateStart , userUpdateSuccess, getAllUsersStart} from "./auth.actions";
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap , map , switchMap , tap} from 'rxjs/operators';
import { Store } from "@ngrx/store";
import {  EMPTY, of } from "rxjs";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage } from "src/app/store/shared/shared.action";
import { User } from "src/app/models/user";


@Injectable()
export class AuthEffects{

  constructor(
    private actions$ : Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private notifier: NotifierService
    ){}


    login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loginStart),
        // take(1),
        exhaustMap((action) => {
          return this.authService.login(action.auth).pipe(
            map((data) => {
              sessionStorage.setItem('userToken', data.userToken);
              sessionStorage.setItem('username', data.username);
              this.notifier.notify('success','Successfully logged in!');
              this.router.navigate(['/']);
              console.log(data);
              return loginSuccess({
                user: data,
                message: 'You have successfully logged in.',
              });
            })
          );
        }),
        catchError(() => {
           this.notifier.notify('error','Error occured!');
          return EMPTY;
        })
      );
    });
  
    
  getAllUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(getAllUsersStart),
        exhaustMap(() => {
          return this.authService.getAllUsers().pipe(
            map((response: User[]) => {
              let allusers: User[] = [];
              allusers = Object.keys(response)
                .map(key => {
                  let newProduct = response[key];
                  newProduct["userId"] = key;
                  return response[key];
                })
              return getAllUsersSuccess({
                users: allusers
              });
            })
          );
        }),
        catchError(() => {
          return EMPTY;
        })
      );
    });


    auto_login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(autoLoginStart),
        map((action) => {
          const username: string = sessionStorage.getItem('username');
          if (!!username) {
            return autoLoginSuccess();
          } else {
            return autoLoginFail({ message: 'Login fail' });
          }
        })
      );
    });
  
    register$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(registerStart),
        exhaustMap((action) => {
          return this.authService.register(action.user).pipe(
            map((data) => {
              this.store.dispatch(registerSuccess({user: action.user,message: "You have registered."})); 
              this.notifier.notify('success','Successfully registered!');
              this.router.navigate(['/auth/login']);
              return registerSuccess({
                user: data,
                message: "You have successfully registered."
              });
            })
          );
        }),
        catchError((errResp) => {
          // this.store.dispatch(setLoadingSpinner({ status: false }));
          //const errorMessage = this.authService.getErrorMessage(
           // errResp.error.error.message
          // );
          // return of(setErrorMessage({ message: errorMessage }));
          this.notifier.notify('error','Error occured!');
          return EMPTY;
        })
      );
    });

    
updateUser$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(userUpdateStart),
  switchMap((action) => {
    return this.authService.updateUser(action.updatedUser).pipe(map((data) => {
      this.router.navigate(['/']);
     return userUpdateSuccess({ message: 'Success' , updatedUser: action.updatedUser });
    })
    );
  })
  );
 });
    
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authLogout),
        map((action) => {
          sessionStorage.clear();
          // this.authService.logOut();
          this.notifier.notify('success','Successfully logged out!');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

}
