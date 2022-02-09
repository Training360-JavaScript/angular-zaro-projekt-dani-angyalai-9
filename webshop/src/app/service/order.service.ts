import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order>{

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('order');
  }
}
