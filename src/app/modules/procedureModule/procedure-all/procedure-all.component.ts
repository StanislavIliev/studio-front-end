import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Procedure} from '../../../models/procedure';
import {ProcedureService} from '../../../services/procedureService';
import {AuthService} from '../../../services/auth.service';
import { ofType } from '@ngrx/effects';
import { allProceduresStart, ALL_PROCEDURES_SUCCESS, deleteProcedureStart } from '../state/procedure.actions';
import { Store,ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
 


@Component({
  selector: 'app-procedure-all',
  templateUrl: './procedure-all.component.html',
  styleUrls: ['./procedure-all.component.scss']
})
export class ProcedureAllComponent implements OnInit {

  procedures: Procedure[] =  [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private procedureService: ProcedureService,
    private actionListener: ActionsSubject,
    private store: Store<AppState>
    ) { 
      this.store.dispatch(allProceduresStart());
    }

  ngOnInit(): void {      
    this.actionListener.pipe(ofType(ALL_PROCEDURES_SUCCESS)).subscribe((data:any)=>{
    this.procedures= data.procedures;
  });
  }

  deleteProcedure(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deleteProcedureStart({ id }));
    }
  }

  addProcedureToCart(procedure: Procedure): void{
    const procedureAndUserId = {
      userId:  this.authService.getUserIdFromLocalCache(),
      procedureId: procedure.id
    };
    this.procedureService.addProcedureToCart(procedureAndUserId).
    subscribe((resp) => {console.log(resp); });
    this.router.navigate(['/procedure-all']);
  }
}
