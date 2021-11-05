import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './modules/page/home-page/home-page.component';
import { ContactComponent } from './modules/page/contact/contact.component';
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
    path: '',
    loadChildren: () => import('./modules/productModule/product.module').then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },  
  {
    path: '',
    loadChildren: () => import('./modules/orderModule/order.module').then((m) => m.OrderModule),
    canActivate: [AuthGuard]
  },  
  {
    path: '',
    loadChildren: () => import('./modules/cartModule/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/procedureModule/procedure.module').then((m) => m.ProcedureModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact', component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
