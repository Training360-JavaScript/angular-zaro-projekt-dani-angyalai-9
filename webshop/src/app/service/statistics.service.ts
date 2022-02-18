import { Injectable, OnInit } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
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
  [domainName: string]: BehaviorSubject<Statistics>;
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
  private results: IResult = {};
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
  ) {
    this.initStatistics();
  }

  private initStatistics() {
    Object.entries(this.domains).forEach((domain) => {
      this.results[domain[0]] = new BehaviorSubject(new Statistics());
    });
    console.log(this.results);
  }

  public getStatistics() {
    let content: IResult = {};
    Object.entries(this.domains).forEach((domain) => {
      this.getData(domain[1], (state: Statistics) =>
        this.results[domain[0]].next(state)
      );
    });
    return this.results;
  }

  private getData(domain: IDomainItem, updateSubject: Function) {
    let state = new Statistics();
    domain.provider.getAll().subscribe((items) => {
      items.forEach((item) => {
        if (item.hasOwnProperty('status')) {
          state = this.checkStatus(item, state);
        }
        if (item.hasOwnProperty('active')) {
          state = this.checkActiveState(item, state);
        }
      });
      updateSubject(state);
    });
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
