import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {User} from '../../../models/user';
import {ProductService} from '../../../services/productService';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
 
  updateProductForm: FormGroup;
  product: Product = new Product();
  user: User = JSON.parse(localStorage.getItem('user'));
  private productId = '';

  constructor(
    private productService: ProductService ,
    private router: Router,
    private r: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.getProductById();
  }


  ngOnInit(): void {
  }

  getProductById(): void{
    this.productId = this.r.snapshot.params.id;
    this.productService.getProductById(this.productId)
      .subscribe((response) => {
        this.product = response;
        console.log(this.product);
        this.parseProductInfo();
      });
  }

  parseProductInfo(): any{
    this.updateProductForm = new FormGroup({
      id: new FormControl(this.product.id),
      description: new FormControl(this.product.description),
      price: new FormControl(this.product.price),
      name: new FormControl(this.product.name)
    });

  }

  updateProduct(): any {
    const updatedProduct = {...this.updateProductForm.value};
    updatedProduct.id = this.product.id;
    console.log(updatedProduct);
    this.productService.updateProduct(updatedProduct)
      .subscribe((response) => {
        this.product = response;
        console.log(this.product);
        this.router.navigate(['/']);
      });

  }
}
