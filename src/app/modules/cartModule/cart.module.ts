import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CartComponent } from "./cart/cart.component";
import { CART_STATE_NAME } from "./state/cart.selector";
import { CartEffects } from "./state/cart.effects";
import { cartReducer } from "./state/cart.reducer";


const routes: Routes = [{
    path: 'cart', component: CartComponent
}]   
@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [ 
    CommonModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(CART_STATE_NAME, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ]
})
export class CartModule{

}
