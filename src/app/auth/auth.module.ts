import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RequestResetComponent } from "./request-reset/request-reset.component";
import { ResponseResetComponent } from "./response-reset/response-reset.component";

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'request-reset', component: RequestResetComponent},
{ path: 'response-reset/:id', component: ResponseResetComponent},
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
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
  ]
})
export class AuthModule{

}
