import { Injectable } from "@angular/core";
import { Actions, createEffect , ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, registerStart, registerSuccess, responsePasswordFail,
     responsePasswordStart, responsePasswordSuccess } from "./auth.actions";
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap , map ,mergeMap,tap} from 'rxjs/operators';
import { Store } from "@ngrx/store";
import {  EMPTY, of } from "rxjs";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage } from "src/app/store/shared/shared.action";

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
          return this.authService.login(action.user).pipe(
            map((response) => {
              sessionStorage.setItem('userToken', response.userToken);
              sessionStorage.setItem('username', response.username);
              this.notifier.notify('success','Successfully logged in!');
              this.router.navigate(['/']);
              return loginSuccess({
                user: response,
                message: 'You have successfully logged in.',
              });
            })
          );
        }),
        catchError(() => {
        //  this.notifier.notify('error','Error occured!','id5');
          return EMPTY;
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
              // this.notifier.notify('success','Successfully registered!');
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
          return EMPTY;
        })
      );
    });
  
}
