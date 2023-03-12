import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  private _apiHeaderName = 'Ocp-Apim-Subscription-Key';
  private _apiHeaderValue = '8e72fb814b4f433e948172902e4c57ec' ; 
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    let modifiedRequest = request.clone({headers:new HttpHeaders().set(this._apiHeaderName,this._apiHeaderValue)});
    console.log(modifiedRequest);
    return next.handle(modifiedRequest);
  }
}
