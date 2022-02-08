import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getURL, httpOptions } from './common.services';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL = getURL('order/');

  constructor(private http: HttpClient) {}

  createItem(order: Order): Observable<Order> {
    return this.http.post<Order>(this.URL, order, httpOptions);
  }
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }
  getItem(id: number): Observable<Order> {
    return this.http.get<Order>(this.URL + id.toString());
  }
  updateItem(order: Order): Observable<Order> {
    let id = order.id.toString();
    return this.http.post<Order>(this.URL + id, order, httpOptions);
  }
  deleteItem(order: Order): Observable<any> {
    return this.http.delete<Order>(this.URL + order.id.toString());
  }
}
