import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SCIFService{

  constructor(http:HttpClient) {
    super(http);
   }

  private sharedDataSubject = new BehaviorSubject<string>(''); // Initial value is an empty string
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  getAllUserData(): Observable<any> {
    return this.http.get(environment.URL + 'usersinfo.json');
  }

  addProductSheetData(body:any): Observable<any> {
    return this.http.post(environment.URL + 'productsheets.json', body);
  }

  editProductSheetData(id:any, body:any): Observable<any> {
    return this.http.put(environment.URL + 'productsheets.json'+ id.toString(), body, {observe: 'response'});
  }

  getProductData(): Observable<any> {
    return this.http.get(environment.URL + 'products.json');
  }

  addProduct(body:any): Observable<any> {
    return this.http.post(environment.URL + 'products/', body, {observe: 'response'});
  }

  editProduct(id:any, body:any): Observable<any> {
    return this.http.put(environment.URL + 'products/' + id.toString(), body, {observe: 'response'});
  }

  deleteProduct(id:any): Observable<any> {
    return this.http.delete(environment.URL + 'products/' + id.toString(), {observe: 'response'});
  }

  getProductInfo(): Observable<any> {
    return this.http.get(environment.URL + 'productsinfo.json');
  }

  addProductInfo(body:any): Observable<any> {
    return this.http.post(environment.URL + 'productsinfo', body, {observe: 'response'});
  }

  editProductInfo(id:any, body:any): Observable<any> {
    return this.http.put(environment.URL + 'productsinfo/'+ id.toString(), body, {observe: 'response'});
  }
}
