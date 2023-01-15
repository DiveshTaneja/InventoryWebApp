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
  isUpdatingProduct: boolean = false;
  factoryId: number;
  factory: FactoryModel;
  productImage:File;
  productId:number;
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
    this.formValue = this.formBuilder.group({
      productName: [''],
      productQuantity: [''],
      productDescription:[''],
      productImage:[null]
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
  resetForm(){
    this.formValue.reset();
    this.isUpdatingProduct=false;
  }
  addProduct() {
    const formData=new FormData();
    formData.append('factoryId',this.factoryId.toString());
    formData.append('productName',this.formValue.value.productName);
    formData.append('quantity',this.formValue.value.productQuantity);
    formData.append('description',this.formValue.value.productDescription);
    if(this.productImage!=null)
      formData.append('image',this.productImage);
    this.productService.addProduct(formData).subscribe(
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
    this.productId = product.productId;
    this.formValue.controls['productName'].setValue(product.productName);
    this.formValue.controls['productQuantity'].setValue(product.quantity);
    this.formValue.controls['productDescription'].setValue(product.description);
    this.productImage=null;
  }

  updateProduct() {
    const formData=new FormData();
    formData.append('factoryId',this.factoryId.toString());
    formData.append('productName',this.formValue.value.productName);
    formData.append('quantity',this.formValue.value.productQuantity);
    formData.append('description',this.formValue.value.productDescription);
    formData.append('productId',this.productId.toString());
    if(this.productImage!=null)
      formData.append('image',this.productImage);
    this.productService.updateProduct(formData).subscribe(
      response => {
        console.log(response);
        alert("Product Updated Successfully");
        this.formValue.reset();
        this.productImage=null;
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
  onFileSelected(event){
    this.productImage=event.target.files[0];
  }

}
