import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './modules/page/home-page/home-page.component';
import {ContactComponent} from './modules/page/contact/contact.component';
import {RegisterComponent} from './auth/register/register.component';
import {OrderComponent} from './modules/orderModule/order/order.component';
import {OrderUpdateComponent} from './modules/orderModule/order-update/order-update.component';
import {OrderDetailsComponent} from './modules/orderModule/order-details/order-details.component';
import {OrdersAllComponent} from './modules/orderModule/orders-all/orders-all.component';
import {CartComponent} from './modules/cartModule/cart/cart.component';
import { AuthGuard } from './services/auth.guard';
 
const routes: Routes = [
  { 
    path: '', 
    component: HomePageComponent},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/productModule/product.module').then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'procedures',
    loadChildren: () => import('./modules/procedureModule/procedure.module').then((m) => m.ProcedureModule),
    canActivate: [AuthGuard]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order-update', component: OrderUpdateComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'orders-all', component: OrdersAllComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
