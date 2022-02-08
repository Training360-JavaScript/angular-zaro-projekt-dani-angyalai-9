import { Injectable } from '@angular/core';
import {} from '@angular/common/http';
import { getURL } from './common.services';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = getURL('product');

  constructor() {}
}
