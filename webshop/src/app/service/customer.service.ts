import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';
import { Address } from '../model/address';
import { ReportableService } from './reportable.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends ReportableService<Customer> {

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('customer');
  }

  createAddress(customer: Customer) {
    if (typeof customer.address === 'string') {
      const addressParts = (customer.address as unknown as string).split(' ');
      const zip = addressParts.shift();
      const street = addressParts.join(' ');
      customer.address = new Address();
      customer.address.zip = parseInt(zip || '');
      customer.address.street = street;
    }
    return customer;
  }

  override getAll(): Observable<Customer[]> {
    return super.getAll().pipe(
      map((list) => {
        return list.map((c) => this.createAddress(c));
      })
    );
  }

  override getItem(id: number): Observable<Customer> {
    return super.getItem(id).pipe(
      map( customer => this.createAddress(customer) )
    );
  }

  override updateItem(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.apiFullUrl}/${customer.id}`,
      customer
    );
  }
}
