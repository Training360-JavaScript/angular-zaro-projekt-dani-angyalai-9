import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService extends BaseService<Bill> {

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('bill');
  }
}
