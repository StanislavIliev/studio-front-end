import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/productService';
import {User} from '../../../models/user';
import { Store , ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { allProductsStart,ALL_PRODUCTS_SUCCESS } from '../state/product.actions';
import { ofType } from '@ngrx/effects';
 

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class ProductAllComponent implements OnInit {

  products: Observable<Product[]>;
  user: User = JSON.parse(localStorage.getItem('user'));


  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private productService: ProductService,
    private actionListener: ActionsSubject
    ) {
      this.store.dispatch(allProductsStart());
     }

    ngOnInit(): void {
      this.actionListener.pipe(ofType(ALL_PRODUCTS_SUCCESS)).subscribe((data:any)=>{
        this.products= data.products;
      });
    }
  
  
  deleteProductById(product: Product): void {

    this.productService.deleteProductById(product)
      .subscribe((resp) => { console.log(resp); });

    this.router.navigate(['/product-all']);
  }
  

  addProductToCart(product: Product): void{
    const productAndUserId = {
      userId:  this.authService.getUserIdFromLocalCache(),
      productId: product.id
    };
    this.productService.addProductToCart(productAndUserId).
      subscribe((resp) => {console.log(resp); });
    this.router.navigate(['/product-all']);
  }
}
