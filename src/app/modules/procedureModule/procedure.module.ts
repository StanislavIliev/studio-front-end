import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProcedureComponent } from  './procedure/procedure.component';
import { ProcedureAllComponent } from  './procedure-all/procedure-all.component';
import { ProcedureUpdateComponent } from  './procedure-update/procedure-update.component';
import { ProcedureEffects } from "./state/procedure.effects";
import { procedureReducer } from "./state/procedure.reducer";
import { PROCEDURE_STATE_NAME } from "./state/procedure.selector";

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
    StoreModule.forFeature(PROCEDURE_STATE_NAME, procedureReducer),
    EffectsModule.forFeature([ProcedureEffects]),
  ]
})
export class ProcedureModule{

}
