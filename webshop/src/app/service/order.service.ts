import { ReportableService } from './reportable.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ReportableService<Order>{

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('order');
  }
}
