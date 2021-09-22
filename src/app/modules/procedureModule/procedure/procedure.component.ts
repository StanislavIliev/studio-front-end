import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Procedure} from '../../../models/procedure';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import { ProcedureService } from '../../../services/procedureService';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addProcedureStart } from '../state/procedure.actions';



@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {

  addProcedureForm: FormGroup;
  procedure: Procedure;
  user: User = JSON.parse(localStorage.getItem('user'));
  startDate = new Date(2021, 2, 9);
  endDate = new Date(2021, 2, 16, 0, 0, 0, 0);
  constructor(
    private router: Router,
    private procedureService: ProcedureService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.addProcedureForm = new FormGroup({
      description: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      price: new FormControl(null),
      name: new FormControl(null),
      date: new FormControl(null, [ Validators.required]),
      user: new FormControl(this.user)
    });
  }

  addProcedure(): any { 
      const newProcedure: Procedure = {...this.addProcedureForm.value};
      console.log(newProcedure);
      this.store.dispatch(addProcedureStart({ newProcedure }));
      // this.actions$.pipe(ofType(addProcedureStart)).subscribe((response) => {})
  
  }

  getOrderById(orderId: string): void{
    this.procedureService.getProcedureById(orderId)
      .subscribe((response) => {
        this.procedure = response;
      });
  }

}
