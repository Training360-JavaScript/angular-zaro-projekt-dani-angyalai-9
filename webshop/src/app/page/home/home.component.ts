import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/service/statistics.service';
import { ProductService } from 'src/app/service/product.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  results = this.statisticsService.results

  constructor(
    private statisticsService: StatisticsService
  ) {
    statisticsService.getStatistics()
  }

  ngOnInit(): void {}
}
