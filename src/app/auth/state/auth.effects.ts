import { Injectable } from "@angular/core";
import { Actions, createEffect , ofType } from "@ngrx/effects";
import { autoLoginStart,autoLoginSuccess,autoLoginFail, authLogout,
   loginStart, loginSuccess, registerStart, registerSuccess, responsePasswordStart , responsePasswordSuccess , 
   requestPaswordSuccess, requestPaswordStart ,userUpdateStart , userUpdateSuccess } from "./auth.actions";
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
        exhaustMap((action) => {
          return this.authService.login(action.auth).pipe(
            map((data) => {
              sessionStorage.setItem('userToken', data.userToken);
              localStorage.setItem('userData', JSON.stringify(data));
              sessionStorage.setItem('username', data.username);
              this.notifier.notify('success','Successfully logged in!');
              this.router.navigate(['/']);
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
      localStorage.setItem('userData', JSON.stringify(data));
     return userUpdateSuccess({ message: 'Success' , updatedUser: action.updatedUser });
    })
    );
  })
  );
 });

 requestEmailPassword$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(requestPaswordStart),
    exhaustMap((action) => {
      return this.authService.requestReset(action.auth).pipe(
        map((data) => {
          this.notifier.notify('success','The email has been successfully!');
          this.router.navigate(['/auth/login']);
          return requestPaswordSuccess({
            auth: data,
            message: 'Successfully.',
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


resetPassword$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(responsePasswordStart),
    exhaustMap((action) => {
      return this.authService.resetPassword(action.auth).pipe(
        map((data) => {
          this.notifier.notify('success','The password has been changed successfully!');
          this.router.navigate(['/auth/login']);
          return responsePasswordSuccess({
            auth: data,
            message: 'Successfully.',
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

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authLogout),
        map((action) => {
          sessionStorage.clear();
          localStorage.clear();
          this.notifier.notify('success','Successfully logged out!');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

}
