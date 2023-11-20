import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagerService } from './manager.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SCIFService extends ManagerService{
  // private apiUrl= 'http://localhost:8000/'

  constructor(http:HttpClient) {
    super(http)
  }

  searchProduct():Observable<any> {
    let url = environment.URL + 'products.json';

    return this.executeGet(url);
  }

  getProductSheetData(): Observable<any> {
    return this.http.get(environment.URL + 'productsheets.json');
  }
}