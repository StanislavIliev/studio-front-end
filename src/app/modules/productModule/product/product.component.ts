import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/productService';
import {User} from '../../../models/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  addProductForm: FormGroup;
  product: Product = new Product();
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      description: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      price: new FormControl(null),
      name: new FormControl(null),
      user: new FormControl(this.user)
    });
  }

  addProduct(): any {
    const newProduct = {...this.addProductForm.value};
    console.log(newProduct);
    this.productService.addProductForm(newProduct)
      .subscribe((response) => {
        this.product = response;
        console.log(this.product);
        this.router.navigate(['/product-all']);
      });
  }

  getOrderById(orderId: string): void{
    this.productService.getProductById(orderId)
      .subscribe((response) => {
        this.product = response;
      });
  }
}
