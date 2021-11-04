import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { Store , ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { addProductToCartStart, allProductsStart, ALL_PRODUCTS_SUCCESS , deleteProductStart } from '../state/product.actions';
import { ofType } from '@ngrx/effects';
import { isAuthenticated } from '../../../auth/state/auth.selector';
 

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class ProductAllComponent implements OnInit {

  products: Observable<Product[]>;
  loggedUser :User;
  isLogged: boolean=false;

  constructor(
    private store: Store<AppState>,
    private actionListener: ActionsSubject
    ) {
      this.store.dispatch(allProductsStart());
      this.getLoggedUser();
     }

    ngOnInit(): void {
      this.actionListener.pipe(ofType(ALL_PRODUCTS_SUCCESS)).subscribe((data:any)=>{
        this.products= data.products;
      });
      this.store.select(isAuthenticated).subscribe((bbb) => {
        this.isLogged=bbb;
      })
    }
  
    deleteProduct(id: string) {
      if (confirm('Are you sure you want to delete')) {
        this.store.dispatch(deleteProductStart({ id }));
      }
    }
  
  addProductToCart(product: Product): void{
    const productAndUserId = {
      userId:  this.loggedUser.id,
      productId: product.id
    };
    this.store.dispatch(addProductToCartStart({ productAndUserId }));
  }

  getLoggedUser(){
    const userDataString = localStorage.getItem('userData'); 
    this.loggedUser = JSON.parse(userDataString);
    return this.loggedUser;
  }
}
