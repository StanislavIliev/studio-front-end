import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, exhaustMap, switchMap} from "rxjs/operators";
import { Router } from "@angular/router";
import { EMPTY } from "rxjs";
import { ProcedureService } from "src/app/services/procedureService";
import { Procedure } from "src/app/models/procedure";
import { allProceduresStart ,allProceduresSuccess ,addProcedureStart ,addProcedureSuccess ,
updateProcedureStart , updateProcedureSuccess ,deleteProcedureStart , deleteProcedureSuccess} from "./procedure.actions";


@Injectable()
export class ProcedureEffects{
  constructor(
    private actions$: Actions,
    private procedureService : ProcedureService,
    private router: Router
    ){}


allProducts$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(allProceduresStart),
    exhaustMap(() => {
      return this.procedureService.getAllProcedures().pipe(
        map((response: Procedure[]) => {
          let allprocedures: Procedure[] = [];
          allprocedures = Object.keys(response)
            .map(key => {
              let newProcedure = response[key];
              newProcedure["procedureId"] = key;
              return response[key];
            })
          return allProceduresSuccess({
            procedures: allprocedures
          });
        })
      );
    }),
    catchError(() => {
      return EMPTY;
    })
  );
});


addProcedure$ = createEffect(() => {
 return this.actions$.pipe
 (ofType(addProcedureStart),
 exhaustMap((action) => {
   return this.procedureService.addProcedure(action.newProcedure).pipe(map((data) => {
    const procedure = {...action.newProcedure,id: data.name};
    this.router.navigate(['/procedure-all']); 
    return addProcedureSuccess({ procedure });
   })
   );
 })
 );
});

updateProcedure$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(updateProcedureStart),
  switchMap((action) => {
    return this.procedureService.updateProcedure(action.procedure).pipe(map((data) => {
     return updateProcedureSuccess({ procedure: action.procedure });
    })
    );
  })
  );
 });

 deleteProcedure$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(deleteProcedureStart),
    switchMap((action) => {
      return this.procedureService.deleteProcedureById(action.id).pipe(
        map((data) => {
          this.router.navigate(['/procedure-all']);
          return deleteProcedureSuccess({ id: action.id });
        })
      );
    })
  );
});


}
