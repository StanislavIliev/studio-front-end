import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
import {Observable , BehaviorSubject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {JwtResponse} from '../models/JwtResponse';
import {CookieService} from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

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

  public logOut(): void {
    this.token = null;
    this.loggedUser = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  findUserById(id: string): any{
    return this.http.get<any>(`http://localhost:8080/users/{id}`);
  }

   updateUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:8080/users/update`, user);
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

  requestReset(auth: User): Observable<any> {
    return this.http.post(`http://localhost:8080/users/req-reset-password`, auth);
  }

  resetPassword(auth: User): Observable<any> {
    return this.http.post(`http://localhost:8080/users/reset-password`, auth);
  }

}

