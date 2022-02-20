import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() dataObject = {};
  @Input() ordinal = 0;
  @Input() caption = '';

  chartdata: ChartData<'pie', number[], string | string[]> = {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataObject'].currentValue) {
      this.chartdata.labels = Object.keys(changes['dataObject'].currentValue);
      this.chartdata.datasets[0].data = Object.values(
        changes['dataObject'].currentValue
      );
      this.chart?.update();
    }
  }
}
