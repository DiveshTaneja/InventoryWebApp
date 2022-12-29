import { HttpClient } from '@angular/common/http';
import { FactoryProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryDTO } from '../interfaces/factory-dto';
import { FactoryModel } from '../models/factory-model';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  constructor(private http: HttpClient) { }
  private baseUrl="https://divesh-inventory-manager.azurewebsites.net/manage/"

  getAllFactories():Observable<FactoryDTO[]>{
    return this.http.get<FactoryDTO[]>(this.baseUrl+"viewAll/factory");
  }

  getFactory(factoryId:number):Observable<FactoryDTO>{
    return this.http.get<FactoryDTO>(this.baseUrl+"factory/"+factoryId);
  }
  
  addFactory(factory:FactoryModel){
    return this.http.post(this.baseUrl+"add/factory",factory);
  }

  deleteFactory(factoryId:number){
    return this.http.delete(this.baseUrl+"delete/factory/"+factoryId);
  }

  updateFactory(factory:FactoryDTO){
    return this.http.put(this.baseUrl+"update/factory",factory);
  }
  
}
