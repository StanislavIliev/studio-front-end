import { Component, OnInit } from '@angular/core';
import {Procedure} from '../../../models/procedure';
import {AuthService} from '../../../services/auth.service';
import { ofType } from '@ngrx/effects';
import { allProceduresStart, ALL_PROCEDURES_SUCCESS,
   deleteProcedureStart ,addProcedureToCartStart} from '../state/procedure.actions';
import { Store,ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-procedure-all',
  templateUrl: './procedure-all.component.html',
  styleUrls: ['./procedure-all.component.scss']
})
export class ProcedureAllComponent implements OnInit {

  procedures: Procedure[] =  [];
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private actionListener: ActionsSubject,
    private store: Store<AppState>
    ) { 
      this.store.dispatch(allProceduresStart());
      this.getLoggedUser();
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
      userId:  this.loggedUser.id,
      procedureId: procedure.id
    };

    console.log(procedureAndUserId);
    this.store.dispatch(addProcedureToCartStart({ procedureAndUserId }));
  }

  getLoggedUser(){
    const userDataString = localStorage.getItem('userData'); 
    this.loggedUser = JSON.parse(userDataString);
    return this.loggedUser;
  }
}
