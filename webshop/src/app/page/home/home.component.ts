import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  Statistics,
  StatisticsService,
} from 'src/app/service/statistics.service';

class ChartDataClass {
  // labels = [''];
  datasets = [{ data: [0] }];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  results = this.statisticsService.getStatistics();
  stats: { [domain: string]: Statistics } = {};
  InitialChartData = new ChartDataClass();

  constructor(private statisticsService: StatisticsService) {}

  getStatisticsFor(domain: string) {
    this.results[domain].results.subscribe((data) => {
      this.stats[domain] = data;
    });
  }

  ngOnInit(): void {
    this.InitialChartData = {
      // labels: ['New', 'Paid', 'Shipped'],
      datasets: [{ data: [] }],
    };
    Object.keys(this.statisticsService.domains).forEach((domain) => {
      this.getStatisticsFor(domain);
    });
  }
}
