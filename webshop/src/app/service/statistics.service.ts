import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Status } from '../model/status';
import { BaseService } from './base.service';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

interface IDomainItem {
  provider: BaseService<any>;
  type: string;
}

export interface IResult {
  [domainName: string]: {
    type: string;
    results: Observable<Statistics>;
  };
}

export class Statistics {
  [key: string]: any;
  quantitiesByStatus = new Status();
  amountsByStatus = new Status();
  activeItems = 0;
  inactiveItems = 0;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public domains: { [name: string]: IDomainItem } = {
    products: {
      provider: this.productService,
      type: 'activity',
    },
    customers: {
      provider: this.customerService,
      type: 'activity',
    },
    orders: {
      provider: this.orderService,
      type: 'billing',
    },
    bills: {
      provider: this.billService,
      type: 'billing',
    },
  };

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private billService: BillService
  ) {}

  public getStatistics() {
    let results: IResult = {};
    Object.entries(this.domains).forEach((domain) => {
      results[domain[0]] = {
        type: domain[1].type,
        results: new Observable()
      };
      results[domain[0]].results = this.getData(domain[1]);
    });
    return results;
  }

  private getData(domain: IDomainItem) {
    let state = new Statistics();
    return domain.provider.getAll().pipe(
      map((items) => {
        items.forEach((item) => {
          if (item.hasOwnProperty('status')) {
            state = this.checkStatus(item, state);
          }
          if (item.hasOwnProperty('active')) {
            state = this.checkActiveState(item, state);
          }
        });
        return state;
      })
    );
  }

  private checkStatus(item: any, state: Statistics) {
    Object.keys(state.quantitiesByStatus).forEach((key) => {
      if (item.status == key) state.quantitiesByStatus[key] += 1;
    });
    Object.keys(state.amountsByStatus).forEach((key) => {
      if (item.hasOwnProperty('amount') && item.status == key)
        state.amountsByStatus[key] += parseFloat(item.amount);
    });
    return state;
  }

  private checkActiveState(item: any, state: Statistics) {
    if (item.active) state.activeItems += 1;
    else state.inactiveItems += 1;
    return state;
  }
}
