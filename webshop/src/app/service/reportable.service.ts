import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportableService<T> extends BaseService<any> {
  constructor(public override http: HttpClient) {
    super(http);
  }

  public report(data: Observable<T>) {
    data.subscribe((items) => console.log(items));
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

  // private checkActiveState(item: any, state: Statistics) {
  //   if (item.active) state.activeItems += 1;
  //   else state.inactiveItems += 1;
  //   return state;
  // }
}
