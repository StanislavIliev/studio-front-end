import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Procedure} from '../../../models/procedure';
import {ProcedureService} from '../../../services/procedureService';
import {AuthService} from '../../../services/auth.service';


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
    private procedureService: ProcedureService) { }

  ngOnInit(): void {
    this.procedureService.getAllProcedures().subscribe((response) => {
      this.procedures = response;
    });
    this.router.navigate(['/procedure-all']);
  }

  deleteProcedureById(procedure: Procedure): void {

    this.procedureService.deleteProcedureById(procedure)
      .subscribe((resp) => { console.log(resp); });

    this.router.navigate(['/procedure-all']);
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
