import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService<Customer> {

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('customer');
  }
}
