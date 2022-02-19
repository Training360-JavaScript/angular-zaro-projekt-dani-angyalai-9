import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// import { Statistics } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() chartdata: ChartData<'pie', number[], string | string[]> = {
    labels: ['test-a', 'test-b', 'test-c'],
    datasets: [{ data: [1, 1, 1] }],
  };

  constructor() {
    // console.log('constructor', this.statistics);
    // this.statistics.subscribe((data) => {
    //   console.log('DATA!: ', data);
    //   console.log(this.chartdata);
    //   let keyword = 'quantitiesByStatus';
    //   this.chartdata.datasets[0].data.push(
    //     data[keyword]['new'],
    //     data[keyword]['paid'],
    //     data[keyword]['shipped']
    //   );
    //   this.chart?.update();
    // });
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  ngOnInit(): void {}
}
