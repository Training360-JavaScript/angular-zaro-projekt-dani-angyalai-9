import { ReportableService } from './reportable.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ReportableService<Product> {

  constructor(public override http: HttpClient) {
    super(http);
    this.setUrlFor('product');
  }
}
