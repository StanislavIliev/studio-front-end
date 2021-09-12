import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ProductAndUserId} from '../models/productAndUserId';
import {Observable} from 'rxjs';
import {Cart} from '../models/cart';
import {ProcedureAndUserId} from '../models/procedureAndUserId';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  deleteProductFromCart(pui: ProductAndUserId): Observable<any> {
    return this.http.post('http://localhost:8080/carts/delete', pui);
  }

  deleteProcedureFromCart(pui: ProcedureAndUserId): Observable<any> {
    return this.http.post('http://localhost:8080/carts/delete', pui);
  }

  getSubTotalCart(id: string): Observable<any> {
    return this.http.post('http://localhost:8080/carts/total', id);
  }


  getCart(id: string): Observable<Cart> {
    return this.http.get(`http://localhost:8080/carts/${id}`);
  }
}
