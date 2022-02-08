import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getURL, httpOptions } from './common.services';
import { Observable } from 'rxjs';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  URL = getURL('bill/');

  constructor(private http: HttpClient) {}

  createItem(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.URL, bill, httpOptions);
  }
  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.URL);
  }
  getItem(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.URL + id.toString());
  }
  updateItem(bill: Bill): Observable<Bill> {
    let id = bill.id.toString();
    return this.http.post<Bill>(this.URL + id, bill, httpOptions);
  }
  deleteItem(bill: Bill): Observable<any> {
    return this.http.delete<Bill>(this.URL + bill.id.toString());
  }
}
