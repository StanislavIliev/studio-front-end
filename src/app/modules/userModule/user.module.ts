import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { UserUpdateComponent } from "./user-update/user-update.component";

const routes: Routes = [
{ path: 'user-update', component: UserUpdateComponent}
]

@NgModule({
  declarations: [
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
    UserUpdateComponent
  ]
})
export class UserModule{

}
