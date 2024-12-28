import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends SCIFService{

  constructor(http:HttpClient) {
      super(http);
     }

     setHeader(){
      let token = JSON.parse(localStorage.getItem('JWT_Token') || '{}');
      this.addHeader("Authorization", token);
    }

    getInventoryReport(): Observable<any> {
      return this.http.get(environment.URL + 'inventoryreport/');
    }

    getPurchasesVsSalesReport(): Observable<any> {
      return this.http.get(environment.URL + 'purchasesvssales/');
    }
}
