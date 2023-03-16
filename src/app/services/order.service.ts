import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient :HttpClient) { }

  baseUrl = "https://apim-get-assessment.azure-api.net/orders/orders-management/";

  addOrder(order :OrderModel){
    return this.httpClient.post("https://divesh-orders-managmenet.azurewebsites.net/orders-management/"+"order",order);
  }

  getAllOrders(productId:number):Observable<OrderModel[]>{
    return this.httpClient.get<OrderModel[]>(this.baseUrl+'product/'+productId);
  }

}
