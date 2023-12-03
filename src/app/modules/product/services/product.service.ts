import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends SCIFService{

  constructor(http:HttpClient) {
    super(http);
   }

  private sharedDataSubject = new BehaviorSubject<string>(''); // Initial value is an empty string
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  getProductSheetData(): Observable<any> {
    return this.http.get(environment.URL + 'productsheets.json');
  }

  getProductData(): Observable<any> {
    return this.http.get(environment.URL + 'products.json');
  }

  addProduct(body:any): Observable<any> {
    return this.http.post(environment.URL + 'products/', body);
  }

  editProduct(body:any, id:any): Observable<any> {
    return this.http.put(environment.URL + 'products/' + id.toString(), body);
  }

  deleteProduct(id:any): Observable<any> {
    return this.http.delete(environment.URL + 'products/' + id.toString());
  }
}
