import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export enum LookupMethod {
  countTypes,
  sum,
  sumBy,
}

interface ValueTypes {
  [key: string]: any;
}

export interface ILookupItem {
  key: string;
  method: LookupMethod;
  by?: string;
}

export interface IResultItem {}

@Injectable({
  providedIn: 'root',
})
export class ReportableService<T> extends BaseService<any> {
  cacheForReports: any[] = [];

  constructor(public override http: HttpClient) {
    super(http);
  }

  public getAllCached(): Observable<any[]> {
    if (this.cacheForReports.length == 0) {
      console.debug('downloading data from server..');
      let data$ = super.getAll();
      data$.subscribe((data) => {
        this.cacheForReports = data;
      });
      return data$;
    } else {
      console.debug('getting data from cache..');
      return of(this.cacheForReports);
    }
  }

  public report(query: ILookupItem) {
    let response: ValueTypes = {};
    return this.getAllCached().pipe(
      map((items) => {
        if (query.method == LookupMethod.countTypes)
          response = this.countTypes(items, query.key);
        if (query.method == LookupMethod.sumBy)
          response = this.sumBy(items, query.key, query.by);
        return response;
      })
    );
  }

  private countTypes(items: any[], key: string) {
    let valueTypes: ValueTypes = {};
    items.forEach((item) => {
      if (item.hasOwnProperty(key)) {
        if (!valueTypes.hasOwnProperty(key)) valueTypes[key] = {};
        if (valueTypes[key].hasOwnProperty(item[key].toString())) {
          valueTypes[key][item[key].toString()] += 1;
        } else {
          valueTypes[key][item[key].toString()] = 1;
        }
      }
    });
    return valueTypes;
  }

  private sumBy(items: any[], key: string, by = '') {
    let valueTypes: ValueTypes = {};
    items.forEach((item) => {
      if (item.hasOwnProperty(key) && item.hasOwnProperty(by)) {
        if (!valueTypes.hasOwnProperty(by)) valueTypes[by] = {};
        if (valueTypes[by].hasOwnProperty(item[by].toString())) {
          valueTypes[by][item[by].toString()] += parseFloat(item[key]);
        } else {
          valueTypes[by][item[by].toString()] = parseFloat(item[key]);
        }
      }
    });
    return valueTypes;
  }
}
