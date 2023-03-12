import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from '../interfaces/product-dto';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private baseUrl="https://apim-get-assessment.azure-api.net/v1/manage/";
  getAllProducts(factoryId:number):Observable<ProductDTO[]>{
    return this.http.get<ProductDTO[]>(this.baseUrl+"viewAll/products/"+factoryId);
  }
  
  addProduct(formData:FormData){
    return this.http.post(this.baseUrl+"add/product",formData);
  }

  deleteProduct(productId:number){
    return this.http.delete(this.baseUrl+"delete/product/"+productId);
  }

  updateProduct(formData:FormData){
    return this.http.put(this.baseUrl+"update/product",formData);
  }
}
