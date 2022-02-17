import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';
import { StatisticsService } from 'src/app/service/statistics.service';

class ChartDataClass {
  labels = [''];
  datasets = [{ data: [0] }];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  results = this.statisticsService.results as any;
  ordersData = new ChartDataClass();
  billsData = new ChartDataClass();
  constructor(private statisticsService: StatisticsService) {
    statisticsService.getStatistics();
  }

  ngOnInit(): void {
    this.ordersData = {
      labels: ['New', 'Paid', 'Shipped'],
      datasets: [
        {
          data: [
            this.results['orders']?.quantitiesByStatus?.new,
            this.results['orders']?.quantitiesByStatus?.paid,
            this.results['orders']?.quantitiesByStatus?.shipped,
          ],
        },
      ],
    };
    this.billsData = {
      labels: ['New', 'Paid', 'Shipped'],
      datasets: [
        {
          // data: [
          //   this.results['bills']?.amountsByStatus?.new,
          //   this.results['bills']?.amountsByStatus?.paid,
          //   this.results['bills']?.amountsByStatus?.shipped,
          // ],
          data: [200, 50, 300],
        },
      ],
    };
  }
}
