import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends SCIFService {

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

    getPaymentMethods(): Observable<any> {
      return this.http.get(environment.URL + 'paymentmethods.json');
    }

    addSale(body:any): Observable<any> {
      return this.http.post(environment.URL + 'sales/', body, {observe: 'response'});
    }

    getSales(): Observable<any> {
      return this.http.get(environment.URL + 'sales-list');
    }

    getSalesDetails(sales_id: number): Observable<any> {
      return this.http.get(environment.URL + `sales/${sales_id}/details`);
    }

    deleteSale(sales_id: number): Observable<any> {
      return this.http.delete(environment.URL + `sales/${sales_id}`, {observe: 'response'});
    }

    updateSalesDetail(detail_id: number, data: any): Observable<any> {
      return this.http.put(environment.URL + `sales-details/${detail_id}/`, data, {observe: 'response'});
    }
}
