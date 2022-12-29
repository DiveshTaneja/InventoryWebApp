import { Component, getModuleFactory, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/interfaces/product-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { FactoryService } from 'src/app/services/factory.service';
import { FactoryDTO } from 'src/app/interfaces/factory-dto';
import { FactoryModel } from 'src/app/models/factory-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: ProductDTO[];
  formValue!: FormGroup;
  productObj: ProductModel;
  isUpdatingProduct: boolean = false;
  factoryId: number;
  factory: FactoryModel;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private factoryService: FactoryService
  ) {
    this.factoryId = this.route.snapshot.params['id'];
    this.factory=new FactoryModel();
    this.getFactory();
    console.log(this.factoryId);
    this.getProducts();
    this.productObj = new ProductModel();
    this.formValue = this.formBuilder.group({
      productName: [''],
      productQuantity: [''],
      productDescription:['']
    })
  }

  ngOnInit(): void {
  }

  getFactory(){
    this.factoryService.getFactory(this.factoryId).subscribe(
      response=>{
        this.factory=response;
        console.log("Got the factory for Product");
      }
    )
  }
  getProducts() {
    this.productService.getAllProducts(this.factoryId).subscribe(
      response => {
        this.products = response;
        console.log(JSON.stringify(this.products));
      }
    )
  }
  addProduct() {
    this.productObj = new ProductModel();
    this.productObj.factoryId = this.factoryId;
    this.productObj.productName = this.formValue.value.productName;
    this.productObj.quantity = Number(this.formValue.value.productQuantity);
    this.productObj.description=this.formValue.value.productDescription;
    this.productService.addProduct(this.productObj).subscribe(
      response => {
        console.log(JSON.stringify(response));
        alert("Product Added Successfully");
        this.formValue.reset();
        let ref = document.getElementById("cancel");
        ref.click();
        this.getProducts();
      }
    )
  }
  deleteProduct(ProductId: number) {
    this.productService.deleteProduct(ProductId).subscribe(
      response => {
        console.log(JSON.stringify(response));
        alert("Product Deleted");
        this.getProducts();
      }
    )
  }
  onEdit(product: ProductDTO) {
    this.isUpdatingProduct = true;
    this.productObj.productId = product.productId;
    this.productObj.factoryId = this.factoryId;
    this.formValue.controls['productName'].setValue(product.productName);
    this.formValue.controls['productQuantity'].setValue(product.quantity);
    this.formValue.controls['productDescription'].setValue(product.description);
  }

  updateProduct() {
    this.productObj.productName = this.formValue.value.productName;
    this.productObj.quantity = Number(this.formValue.value.productQuantity);
    this.productObj.description = this.formValue.value.productDescription;
    console.log(this.productObj);
    this.productService.updateProduct(this.productObj).subscribe(
      response => {
        console.log(response);
        alert("Product Updated Successfully");
        this.formValue.reset();
        let ref = document.getElementById("cancel");
        ref.click();
        this.getProducts();
        this.isUpdatingProduct = false;
      }
    )
  }

  navigateFactory(){
    this.router.navigate(['']);
  }

}
