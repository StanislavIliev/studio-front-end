import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OrdersAllComponent } from "./orders-all/orders-all.component";
import { OrderComponent } from "./order/order.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderEffects } from "./state/order.effects";
import { orderReducer } from "./state/order.reducer";
import { ORDER_STATE_NAME } from "./state/order.selector";

const routes: Routes = [
    {path: 'order', component: OrderComponent},
    {path: 'orders-all', component: OrdersAllComponent},
    {path: 'order-details', component: OrderDetailsComponent},    
  ]
    
@NgModule({
  declarations: [
    OrdersAllComponent,
    OrderComponent,
    OrderDetailsComponent
    ],
  imports: [ 
    CommonModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(ORDER_STATE_NAME, orderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ]
})
export class OrderModule{

}
