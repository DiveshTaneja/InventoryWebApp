import { HttpClient } from '@angular/common/http';
import { FactoryProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryDTO } from '../interfaces/factory-dto';
import { FactoryModel } from '../models/factory-model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  constructor(private http: HttpClient) { }
  private baseUrl="https://apim-get-assessment.azure-api.net/v1/manage/"

  getAllFactories():Observable<FactoryDTO[]>{
    return this.http.get<FactoryDTO[]>(this.baseUrl+"viewAll/factory");
  }

  getFactory(factoryId:number):Observable<FactoryDTO>{
    return this.http.get<FactoryDTO>(this.baseUrl+"factory/"+factoryId);
  }
  
  addFactory(factory:FactoryModel){
    return this.http.post( "https://divesh-inventory.azurewebsites.net/manage/"+"add/factory",factory);
  }

  deleteFactory(factoryId:number){
    return this.http.delete(this.baseUrl+"delete/factory/"+factoryId);
  }

  updateFactory(factory:FactoryDTO){
    return this.http.put( "https://divesh-inventory.azurewebsites.net/manage/"+"update/factory",factory);
  }
  
}
