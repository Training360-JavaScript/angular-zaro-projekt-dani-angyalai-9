import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getURL, httpOptions } from './common.services';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = getURL('product/');

  constructor(private http: HttpClient) {}

  createItem(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product, httpOptions);
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }
  getItem(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL + id.toString());
  }
  updateItem(product: Product): Observable<Product> {
    let id = product.id.toString();
    return this.http.post<Product>(this.URL + id, product, httpOptions);
  }
  deleteItem(product: Product): Observable<any> {
    return this.http.delete<Product>(this.URL + product.id.toString());
  }
}
