import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './chart-theme';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  @Input() title = 'asdsa';
  @Input() subtitle = '';
  @Input() data = [{}];

  options: EChartsOption = {};

  theme: string | ThemeOption = '';
  coolTheme = CoolTheme;

  ngOnInit() {
    this.options = {
      title: {
        text: this.title,
        subtext: this.subtitle,
        // x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      // legend: {
      //   // x: 'center',
      //   // y: 'bottom',
      //   data: [
      //     'rose1',
      //     'rose2',
      //     'rose3',
      //     'rose4',
      //     'rose5',
      //     'rose6',
      //     'rose7',
      //     'rose8',
      //   ],
      // },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [0, 110],
          roseType: 'area',
          data: this.data,
        },
      ],
    };
  }
}
