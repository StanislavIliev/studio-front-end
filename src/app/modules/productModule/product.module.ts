import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProductAllComponent } from "./product-all/product-all.component";
import { ProductUpdateComponent } from "./product-update/product-update.component";
import { ProductComponent } from "./product/product.component";
import { ProductEffects } from "./state/product.effects";
import { productReducer } from "./state/product.reducer";
import { PRODUCT_STATE_NAME } from "./state/product.selector";

const routes: Routes = [
    {path: 'product', component: ProductComponent},
    {path: 'product-all', component: ProductAllComponent},
    {path: 'product-update/:id', component: ProductUpdateComponent},
  ]
    
@NgModule({
  declarations: [
    ProductAllComponent,
    ProductComponent,
    ProductUpdateComponent
  ],
  imports: [ 
    CommonModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ]
})
export class ProductModule{

}
