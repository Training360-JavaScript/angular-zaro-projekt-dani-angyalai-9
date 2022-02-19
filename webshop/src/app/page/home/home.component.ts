import { Observable } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { LookupMethod, ValueType } from 'src/app/service/reportable.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  prodrep$ = this.productService.report({
    key: 'active',
    type: ValueType.Boolean,
    method: LookupMethod.countTypes,
  });

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: ProductService,
    private billService: BillService
  ) {
    // prodrep = this.productService.report({
    //   key: 'active',
    //   type: ValueType.Boolean,
    //   method: LookupMethod.countTypes,
    // });
    this.customerService.report({
      key: 'active',
      type: ValueType.Boolean,
      method: LookupMethod.countTypes,
    });
    this.orderService.report({
      key: 'status',
      method: LookupMethod.countTypes,
    });
    this.billService.report({ key: 'status', method: LookupMethod.countTypes });
    this.billService.report({
      key: 'amount',
      method: LookupMethod.sumBy,
      by: 'status',
    });
  }

  ngOnInit(): void {}
}
