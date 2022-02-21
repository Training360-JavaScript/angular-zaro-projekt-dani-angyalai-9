import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { LookupMethod } from 'src/app/service/reportable.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orderReport$ = this.orderService.report({
    key: 'status',
    method: LookupMethod.countTypes,
  });

  billReport$ = this.billService.report({
    key: 'amount',
    method: LookupMethod.sumBy,
    by: 'status',
  });

  activeProductsDataPair$ = this.productService
    .report({
      key: 'active',
      method: LookupMethod.countTypes,
    })
    .pipe(
      map((response) => [
        response['active']['true'],
        response['active']['false'],
      ])
    );

  activeCustomersDataPair$ = this.customerService
    .report({
      key: 'active',
      method: LookupMethod.countTypes,
    })
    .pipe(
      map((response) => [
        response['active']['true'],
        response['active']['false'],
      ])
    );

  unpaidOrderDataPair$ = this.orderReport$.pipe(
    map((response) => [
      response['status']['new'],
      response['status']['paid'] + response['status']['shipped'],
    ])
  );

  unpaidBillAmountDataPair$ = this.billReport$.pipe(
    map((response) => [response['status']['new'], response['status']['paid']])
  );

  ordersByStatus$ = this.orderReport$.pipe(
    map((response) => response['status'])
  );

  amountsByStatus$ = this.billReport$.pipe(
    map((response) => response['status'])
  );

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private billService: BillService
  ) {}

  ngOnInit(): void {}
}
