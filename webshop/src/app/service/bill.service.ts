import { ReportableService } from './reportable.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService extends ReportableService<Bill> {

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('bill');
  }
}
