import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getURL, httpOptions } from './common.services';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  URL = getURL('customer/');

  constructor(private http: HttpClient) {}

  createItem(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.URL, customer, httpOptions);
  }
  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL);
  }
  getItem(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.URL + id.toString());
  }
  updateItem(customer: Customer): Observable<Customer> {
    let id = customer.id.toString();
    return this.http.post<Customer>(this.URL + id, customer, httpOptions);
  }
  deleteItem(customer: Customer): Observable<any> {
    return this.http.delete<Customer>(this.URL + customer.id.toString());
  }
}
