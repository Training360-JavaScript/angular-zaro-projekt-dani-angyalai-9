import { ReportableService } from './reportable.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id: number }> {
  apiBaseUrl = environment.apiBaseUrl;
  apiFullUrl = '';

  constructor(public http: HttpClient) {}

  setUrlFor(entityName: string) {
    this.apiFullUrl = this.apiBaseUrl + entityName;
  }

  createItem(item: T): Observable<T> {
    return this.http.post<T>(this.apiFullUrl, item);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiFullUrl);
  }

  getItem(id: number): Observable<T> {
    return this.http.get<T>(this.apiFullUrl + '/' + id.toString());
  }

  updateItem(item: T): Observable<T> {
    return this.http.patch<T>(this.apiFullUrl + '/' + item.id, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<T>(this.apiFullUrl + '/' + id.toString());
  }
}
