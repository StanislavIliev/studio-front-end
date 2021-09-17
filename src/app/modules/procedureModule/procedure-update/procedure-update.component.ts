import { Component, OnInit ,OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Procedure} from '../../../models/procedure';
import {User} from '../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getProcedureById } from '../state/procedure.selector';
import { updateProcedureStart } from '../state/procedure.actions';

@Component({
  selector: 'app-procedure-update',
  templateUrl: './procedure-update.component.html',
  styleUrls: ['./procedure-update.component.scss']
})
export class ProcedureUpdateComponent implements OnInit, OnDestroy {

  updateProcedureForm: FormGroup;
  procedure: Procedure = new Procedure();
  user: User = JSON.parse(localStorage.getItem('user'));
  procedureSubscription: Subscription;


  constructor(
    private router: Router,
    private r: ActivatedRoute,
    private store: Store<AppState>
  ) {
//    this.getProcedureById();
  }

  ngOnInit(): void {
    this.r.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.procedureSubscription = this.store
        .select(getProcedureById, { id })
        .subscribe((data) => {
          this.procedure = data;
          this.parseProcedureInfo();
        });
    });
  }

  // getProcedureById(): void{
  //   this.procedureId = this.r.snapshot.params.id;
  //   this.procedureService.getProcedureById(this.procedureId)
  //     .subscribe((response) => {
  //       this.procedure = response;
  //       console.log(this.procedure);
  //       this.parseProcedureInfo();
  //     });
  // }

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
    if (!this.updateProcedureForm.valid) {
      return;
    }
    const description = this.updateProcedureForm.value.description;
    const price = this.updateProcedureForm.value.price;
    const name = this.updateProcedureForm.value.name;
    const date =this.updateProcedureForm.value.date;

    const procedure: Procedure = {
      id: this.procedure.id,
      description,
      price,
      name,
      date
    };

    this.store.dispatch(updateProcedureStart({ procedure }));
    this.router.navigate(['/procedure-all']);
}

  ngOnDestroy() {
  if (this.procedureSubscription) {
    this.procedureSubscription.unsubscribe();
  }
}

}
