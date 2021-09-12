import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RequestResetComponent } from "./request-reset/request-reset.component";
import { ResponseResetComponent } from "./response-reset/response-reset.component";
import { UserUpdateComponent } from "./user-update/user-update.component";

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'request-reset', component: RequestResetComponent},
{ path: 'response-reset', component: ResponseResetComponent},
{ path: 'user-update', component: UserUpdateComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(),
    RouterModule.forChild(routes)
  ], 
  exports:
  [
    LoginComponent,
    RegisterComponent,
    ResponseResetComponent,
    RequestResetComponent,
    UserUpdateComponent
  ]
})
export class AuthModule{

}
