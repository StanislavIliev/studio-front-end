import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Procedure} from '../models/procedure';
import {ProcedureAndUserId} from '../models/procedureAndUserId';
import {Product} from '../models/product';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private http: HttpClient) { }



  addProcedureToCart(pui: ProcedureAndUserId): Observable<ProcedureAndUserId>{
    return this.http.post<ProcedureAndUserId>('http://localhost:8080/carts/add-procedure', pui);
  }

  addProcedureForm(procedure: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`http://localhost:8080/procedures/add`, procedure);
  }


  deleteProcedureById(procedure: Procedure): Observable<Procedure> {
    return this.http.post(`http://localhost:8080/procedures/delete/`, procedure);
  }

  getProcedureById(id: string): Observable<Procedure>{
    return this.http.get(`http://localhost:8080/procedures/${id}`);
  }

  getAllProcedures(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>('http://localhost:8080/procedures/all');
  }


  updateProcedure(procedure: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`http://localhost:8080/procedures/update`, procedure);
  }
}
