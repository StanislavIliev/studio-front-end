import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {User} from '../models/user';
import {Observable , BehaviorSubject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {JwtResponse} from '../models/JwtResponse';
import {CookieService} from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { authLogout } from '../auth/state/auth.actions';
import { AuthResponse, AuthResponseData } from '../models/auth.responsible';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval: any;

  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;
  private token: string;
  private loggedUser: string;
  private http: HttpClient;
  private jwtHelper: JwtHelperService;

  constructor(http: HttpClient, private router: Router , private store:Store<AppState>, private cookieService: CookieService
    // private http: HttpClient
  ) {
    this.http = http;
    this.jwtHelper = new JwtHelperService();
    const memo = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
    this.currentUser = this.currentUserSubject.asObservable();
    cookieService.set('currentUser', memo);
  }


   
  login(user : User): Observable<User> {
    return this.http.post<User>(`http://localhost:8080/users/login`,  user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:8080/users/register`, user);
  }


  public setAuthorityVariables(token): any{
    if (token !== null) {
      const objToken = this.jwtHelper.decodeToken(token);

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < objToken.authorities.length; i++) {
        const authority = objToken.authorities[i];
        if (authority === 'ADMIN') {
          localStorage.setItem('admin', 'ADMIN');
        } else if (authority === 'USER') {
          localStorage.setItem('user', 'USER');
        }
      }
      // this.sendMessage();
      // console.log(objToken.authorities);
    }
  }

  public get currentUserValue(): any {
   return this.currentUserSubject.value;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  
  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(authLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }
  
  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    let user: User;
    user.id = data.localId;
    user.username = data.username;
    return user;
  }
  
  public getUserIdFromLocalCache(): string {
    return JSON.parse(localStorage.getItem('user')).id;
  }

 
  public isAdmin(role: string): boolean {
    return !!localStorage.getItem('admin');
  }
  public isUser(role: string): boolean {
    return !!localStorage.getItem('user');
  }

  public logOut(): void {
    this.token = null;
    this.loggedUser = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }


  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.post<User>(`http://localhost:8080/users/getUser`, username);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:8080/users/update`, user);
  }

    
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users/all/{all.json}`);
  }

  

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token.trim() !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedUser = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }

  requestReset(email: string): Observable<any> {
    return this.http.post(`http://localhost:8080/users/req-reset-password`, email);
  }


  setNewPassword(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/users/reset-password`, formData);
  }

  handleError(error: HttpErrorResponse): void {
    console.log(error);
  }

  validPasswordToken(): string {
    return this.token;
  }
}

