import { BaseService } from './base.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
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
    console.log(this.cacheForReports);
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
    console.log(this.apiFullUrl);

    return this.getAllCached().pipe(
      map((items) => {
        console.debug(items);
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
        if (valueTypes.hasOwnProperty(key)) {
          if (valueTypes[key].hasOwnProperty(item[key].toString())) {
            valueTypes[key][item[key].toString()] += 1;
          } else {
            valueTypes[key][item[key].toString()] = 1;
          }
        } else valueTypes[key] = {};
      }
    });
    return valueTypes;
    // return { labels: ['test-a', 'test-b', 'test-c'], datasers: [] };
  }

  private sumBy(items: any[], key: string, by: string | undefined) {
    return {};
    // return { message: 'sumBy' };
  }

  // private checkStatus(item: any, state: Statistics) {
  //   Object.keys(state.quantitiesByStatus).forEach((key) => {
  //     if (item.status == key) state.quantitiesByStatus[key] += 1;
  //   });
  //   Object.keys(state.amountsByStatus).forEach((key) => {
  //     if (item.hasOwnProperty('amount') && item.status == key)
  //       state.amountsByStatus[key] += parseFloat(item.amount);
  //   });
  //   return state;
  // }
}
