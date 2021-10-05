import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ItemDeleteAndUserId } from '../models/itemDeleteAndUserId';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  deleteItemFromCart(item: ItemDeleteAndUserId): Observable<any> {
    return this.http.post('http://localhost:8080/carts/delete', item);
  }


  getSubTotalCart(id: string): Observable<any> {
    return this.http.post('http://localhost:8080/carts/total', id);
  }


  emptyCart(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/carts/deleteAll', user);
  }


  getCart(id: string): Observable<Cart> {
    return this.http.get(`http://localhost:8080/carts/${id}`);
  }
  
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`http://localhost:8080/orders/add`, order);
  }
  
}
