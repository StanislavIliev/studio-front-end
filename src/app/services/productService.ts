import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {ProductAndUserId} from '../models/productAndUserId';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  addProductForm(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8080/products/add`, product);
  }

  deleteProductById(id: string): Observable<Product> {
    return this.http.post(`http://localhost:8080/products/delete/`, id);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8080/products/update`, product);
  }

  getProductById(id: string): Observable<Product>{

    return this.http.get(`http://localhost:8080/products/${id}`);
  }


  addProductToCart(pui: ProductAndUserId): Observable<ProductAndUserId>{
    return this.http.post<ProductAndUserId>('http://localhost:8080/carts/add-product', pui);
  }


  getAllProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/products/all');
  }
}
