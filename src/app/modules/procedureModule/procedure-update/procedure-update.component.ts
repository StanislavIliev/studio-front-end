import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Procedure} from '../../../models/procedure';
import {User} from '../../../models/user';
import {ProcedureService} from '../../../services/procedureService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-procedure-update',
  templateUrl: './procedure-update.component.html',
  styleUrls: ['./procedure-update.component.scss']
})
export class ProcedureUpdateComponent implements OnInit {
  updateProcedureForm: FormGroup;
  procedure: Procedure = new Procedure();
  user: User = JSON.parse(localStorage.getItem('user'));
  private procedureId = '';


  constructor(
    private procedureService: ProcedureService ,
    private router: Router,
    private r: ActivatedRoute
  ) {
    this.getProcedureById();
  }

  ngOnInit(): void {
  }

  getProcedureById(): void{
    this.procedureId = this.r.snapshot.params.id;
    this.procedureService.getProcedureById(this.procedureId)
      .subscribe((response) => {
        this.procedure = response;
        console.log(this.procedure);
        this.parseProcedureInfo();
      });
  }

  parseProcedureInfo(): any{
    this.updateProcedureForm = new FormGroup({
      id: new FormControl(this.procedure.id),
      description: new FormControl(this.procedure.description),
      price: new FormControl(this.procedure.price),
      name: new FormControl(this.procedure.name),
      date: new FormControl(this.procedure.date)
    });

  }

  updateProcedure(): any {
    const updatedProcedure = {...this.updateProcedureForm.value};
    updatedProcedure.id = this.procedure.id;
    console.log(updatedProcedure);
    this.procedureService.updateProcedure(updatedProcedure)
      .subscribe((response) => {
        this.procedure = response;
        console.log(this.procedure);
        this.router.navigate(['/']);
      });
  }
}
