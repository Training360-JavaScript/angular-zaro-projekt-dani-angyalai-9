import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  Statistics,
  StatisticsService,
} from 'src/app/service/statistics.service';

class ChartDataClass {
  labels = [''];
  datasets = [{ data: [0] }];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  stat = this.statisticsService.getStatistics() as any;
  InitialChartData = new ChartDataClass();

  constructor(private statisticsService: StatisticsService) {
    this.InitialChartData = {
      labels: ['New', 'Paid', 'Shipped'],
      datasets: [{ data: [] }],
    };
  }

  getStatFor(domain: string, property: string) {
    return this.stat[domain][property];
  }
}
