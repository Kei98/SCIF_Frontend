import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends SCIFService{

  constructor(http:HttpClient) {
    super(http);
   }

  private sharedDataSubject = new BehaviorSubject<string>(''); // Initial value is an empty string
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  setHeader(){
    let token = JSON.parse(localStorage.getItem('JWT_Token') || '{}');
    this.addHeader("Authorization", token);
  }

  getSupplier(): Observable<any> {
    return this.http.get(environment.URL + 'suppliers.json');
  }

  addSupplier(body:any): Observable<any> {
    return this.http.post(environment.URL + 'suppliers/', body, {observe: 'response'});
  }

  editSupplier(id:any, body:any): Observable<any> {
    return this.http.put(environment.URL + 'suppliers/'+ id.toString(), body, {observe: 'response'});
  }

  deleteSupplier(id:any): Observable<any> {
    return this.http.delete(environment.URL + 'suppliers/'+ id.toString(), {observe: 'response'});
  }

}
