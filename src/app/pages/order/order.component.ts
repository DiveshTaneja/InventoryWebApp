import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from 'src/app/interfaces/product-dto';
import { OrderModel } from 'src/app/models/order-model';
import { ProductModel } from 'src/app/models/product-model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:OrderModel[];
  productId:number;
  product:ProductModel;
  constructor(private orderService:OrderService,
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService
    ) {
    this.productId=this.route.snapshot.params['id']
    this.getOrders();
    this.getProduct();
   }

  ngOnInit(): void {
  }

  getProduct(){
    this.productService.getProduct(this.productId).subscribe(
      res=>{
        this.product=res;
      }
    )
  }
  getOrders(){
    this.orderService.getAllOrders(this.productId).subscribe(
      res =>{
        this.orders=res;
        this.orders.sort( this.compare );
        this.orders.forEach((currentValue,index)=>{
          currentValue.createdDate= new Date(currentValue.createdDate).toString()
          this.orders[index]= currentValue;
        });
      }
    )
  }
  compare( a, b ) {
    if ( a.orderId < b.orderId ){
      return 1;
    }
    if ( a.orderId > b.orderId ){
      return -1;
    }
    return 0;
  }
  navigateFactory(){
    this.router.navigate(['']);
  }

  navigateProducts(){
    this.router.navigate(['/factory',this.product.factoryId])
  }
  
  

}
