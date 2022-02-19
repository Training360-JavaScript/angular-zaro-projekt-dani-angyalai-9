import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BillService } from 'src/app/service/bill.service';
import { LookupMethod, ValueType } from 'src/app/service/reportable.service';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() dataset = [];

  prodrep$ = this.billService.report({
    key: 'active',
    type: ValueType.Boolean,
    method: LookupMethod.countTypes,
  });

  chartdata: ChartData<'pie', number[], string | string[]> = {
    labels: ['test-a', 'test-b', 'test-c'],
    datasets: [{ data: [] }],
  };

  constructor(private billService: BillService) {
    this.billService
      .report({
        key: 'active',
        type: ValueType.Boolean,
        method: LookupMethod.countTypes,
      })
      .subscribe((response) => {
        console.log('CHART: ', response);
        this.chartdata.datasets[0].data = [20, 30, 60];
        this.chart?.update();
      });
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
