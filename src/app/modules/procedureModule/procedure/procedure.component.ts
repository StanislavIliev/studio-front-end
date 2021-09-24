import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Procedure } from '../../../models/procedure';
import { User } from '../../../models/user';
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
  user: User = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private procedureService: ProcedureService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.addProcedureForm = new FormGroup({
      description: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      date: new FormControl('', [ Validators.required]),
      user: new FormControl(this.user)
    });
  }

  addProcedure(): any { 
      const newProcedure: Procedure = {...this.addProcedureForm.value};
      console.log(newProcedure);
      this.store.dispatch(addProcedureStart({ newProcedure }));
  }

  getOrderById(orderId: string): void{
    this.procedureService.getProcedureById(orderId)
      .subscribe((response) => {
        this.procedure = response;
      });
  }
}
