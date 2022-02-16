import { Injectable } from '@angular/core';
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

interface IResult {
  [domainName: string]: {
    type: string;
    results?: Activity | Billing;
  };
}

class Billing {
  quantitiesByStatus = new Status();
  amountsByStatus = new Status();
}

class Activity {
  activeItems = 0;
  inactiveItems = 0;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public results: IResult = {};
  private domains: { [name: string]: IDomainItem } = {
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
    Object.entries(this.domains).forEach((domain) => {
      this.getData(domain[0], domain[1]);
    });
  }

  private getData(domainName: string, domain: IDomainItem) {
    let billing = new Billing();
    let activity = new Activity();
    this.results[domainName] = { type: domain.type };
    domain.provider.getAll().subscribe((items) => {
      items.forEach((item) => {
        if (item.hasOwnProperty('status')) {
          billing = this.checkStatus(item, billing);
        }
        if (item.hasOwnProperty('active')) {
          activity = this.checkActiveState(item, activity);
        }
      });
    });
    if (domain.type == 'billing') {
      this.results[domainName].results = billing;
    } else {
      this.results[domainName].results = activity;
    }
  }

  private checkStatus(item: any, state: Billing) {
    Object.keys(state.quantitiesByStatus).forEach((key) => {
      if (item.status == key) state.quantitiesByStatus[key] += 1;
    });
    Object.keys(state.amountsByStatus).forEach((key) => {
      if (item.hasOwnProperty('amount') && item.status == key)
        state.amountsByStatus[key] += parseFloat(item.amount);
    });
    return state;
  }

  private checkActiveState(item: any, state: Activity) {
    if (item.active) state.activeItems += 1;
    else state.inactiveItems += 1;
    return state;
  }
}
