import { Component, Input, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() chartdata: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };

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

  addSlice(): void {
    // if (this.chartdata.labels) {
    //   this.chartdata.labels.push(['Line 1', 'Line 2', 'Line 3']);
    // }
    this.chartdata.datasets[0].data[0] = 500;
    this.chart?.update();
  }

  removeSlice(): void {
    // if (this.chartdata.labels) {
    //   this.chartdata.labels.pop();
    // }
    // this.chartdata.datasets[0].data.pop();
    this.chartdata.datasets[0].data[0] = 800;
    this.chart?.update();
  }
}
