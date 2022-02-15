import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  results = this.statisticsService.results as any;

  constructor(private statisticsService: StatisticsService) {
    statisticsService.getStatistics();
  }

  ngOnInit(): void {}
}
