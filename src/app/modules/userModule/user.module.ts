import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { userReducer } from "./state/user.reducer";
import { UserEffects } from "./state/user.effects";
import { USER_STATE_NAME } from "./state/user.reducer";

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
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(USER_STATE_NAME , userReducer),
    RouterModule.forChild(routes)
  ], 
  exports:
  [
    UserUpdateComponent
  ]
})
export class UserModule{

}

