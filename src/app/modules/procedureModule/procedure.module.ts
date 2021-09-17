import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProcedureComponent } from  './procedure/procedure.component';
import { ProcedureAllComponent } from  './procedure-all/procedure-all.component';
import { ProcedureUpdateComponent } from  './procedure-update/procedure-update.component';

const routes: Routes = [
    {path: 'procedure', component: ProcedureComponent},
    {path: 'procedure-all', component: ProcedureAllComponent},
    {path: 'procedure-update/:id', component: ProcedureUpdateComponent},
    
  ]
    
@NgModule({
  declarations: [
    ProcedureAllComponent,
    ProcedureComponent,
    ProcedureUpdateComponent
  ],
  imports: [ 
    CommonModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
   // StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
   // EffectsModule.forFeature([ProductEffects]),
  ]
})
export class ProcedureModule{

}
