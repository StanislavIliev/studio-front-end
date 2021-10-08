import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8080/orders/all');
  }

  addOrderForm(order: Order): Observable<Order> {
    return this.http.post<Order>(`http://localhost:8080/orders/add`, order);
  }

  getOrderById(id: string): Observable<Order>{
    return this.http.get(`http://localhost:8080/orders/${id}`);
  }

  deleteOrderById(order: Order): Observable<Order> {
    return this.http.post(`http://localhost:8080/orders/delete/`, order);
  }

}
