import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './modules/page/home-page/home-page.component';
import {ContactComponent} from './modules/page/contact/contact.component';
import {RegisterComponent} from './auth/register/register.component';
import {OrderComponent} from './modules/orderModule/order/order.component';
import {OrderUpdateComponent} from './modules/orderModule/order-update/order-update.component';
import {UserUpdateComponent} from './auth/user-update/user-update.component';
import {ProcedureUpdateComponent} from './modules/procedureModule/procedure-update/procedure-update.component';
import {OrderDetailsComponent} from './modules/orderModule/order-details/order-details.component';
import {OrdersAllComponent} from './modules/orderModule/orders-all/orders-all.component';
import {ResponseResetComponent} from './auth/response-reset/response-reset.component';
import {RequestResetComponent} from './auth/request-reset/request-reset.component';
import {CartComponent} from './modules/cartModule/cart/cart.component';
import {ProcedureComponent} from './modules/procedureModule/procedure/procedure.component';
import {ProcedureAllComponent} from './modules/procedureModule/procedure-all/procedure-all.component';
import { AuthGuard } from './services/auth.guard';
 
const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/productModule/product.module').then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order-update', component: OrderUpdateComponent},
  {path: 'user-update', component: UserUpdateComponent},
  {path: 'procedure-update/:id', component: ProcedureUpdateComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'orders-all', component: OrdersAllComponent},
  {path: 'response-reset/:?', component: ResponseResetComponent},
  {path: 'request-reset', component: RequestResetComponent},
  {path: 'cart', component: CartComponent},
  {path: 'procedure', component: ProcedureComponent},
  {path: 'procedure-all', component: ProcedureAllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
