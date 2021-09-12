import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './modules/page/home-page/home-page.component';
import { ContactComponent } from './modules/page/contact/contact.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { OrderComponent } from './modules/orderModule/order/order.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { OrderUpdateComponent } from './modules/orderModule/order-update/order-update.component';
import { OrderDetailsComponent } from './modules/orderModule/order-details/order-details.component';
import { OrdersAllComponent } from './modules/orderModule/orders-all/orders-all.component';
import { CartComponent } from './modules/cartModule/cart/cart.component';
import { ProcedureComponent } from './modules/procedureModule/procedure/procedure.component';
import { ProcedureAllComponent } from './modules/procedureModule/procedure-all/procedure-all.component';
import { ProcedureUpdateComponent } from './modules/procedureModule/procedure-update/procedure-update.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CustomSerializer } from './store/router/custom-serializer';
import { AuthTokenInterceptor } from './services/auth.interceptor';
import { NotifierModule } from 'angular-notifier';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './modules/productModule/product.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    HomePageComponent,
    ContactComponent,
    OrderComponent,
    OrderUpdateComponent,
    OrderDetailsComponent,
    OrdersAllComponent,
    CartComponent,
    ProcedureComponent,
    ProcedureAllComponent,
    ProcedureUpdateComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer}),
        AuthModule,
        ProductModule,
        NotifierModule.withConfig({
          position: {
            horizontal: {
            position: 'right',
            distance: 25
          },
          vertical: {
            position: 'top',
            distance: 25,
            gap: 10
          },
        },
          behaviour: {
            autoHide: 4000,
            onClick: false,
            onMouseover: 'pauseAutoHide',
            showDismissButton: true,
            stacking: 4
          },
          animations: {
            enabled: true,
            show: {
              preset: 'slide',
              speed: 300,
              easing: 'ease',
            },
            hide: {
              preset: 'fade',
              speed: 300,
              easing: 'ease',
              offset: 50,
            },
            shift: {
              speed: 300,
              easing: 'ease',
            },
            overlap: 150,
          }
        }),
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
