import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/productService';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addProductStart } from '../state/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  addProductForm: FormGroup;
  product: Product;
  user: User = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      description: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      user: new FormControl(this.user)
    });
  }

  addProduct(): any {
    const newProduct: Product = {...this.addProductForm.value};
    this.store.dispatch(addProductStart({ newProduct }));
    }

  getOrderById(orderId: string): void{
    this.productService.getProductById(orderId)
      .subscribe((response) => {
        this.product = response;
      });
  }
}
