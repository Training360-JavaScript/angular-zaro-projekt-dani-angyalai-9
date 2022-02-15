import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-spinner',
  templateUrl: './chart-spinner.component.html',
  styleUrls: ['./chart-spinner.component.scss'],
})
export class ChartSpinnerComponent implements OnInit {
  @Input() itemName = '';
  @Input() color = '';
  @Input() unit = '';
  @Input() activeItems = 0;
  @Input() inactiveItems = 0;

  colors: { [key: string]: any } = {
    info: {
      inner: '#C7E596',
      outer: '#78C000',
    },
    warning: {
      inner: '#FF7F7F',
      outer: '#AA5000',
    },
  };

  constructor() {}

  formatTitle = (percent: number): string => {
    return Math.floor(
      ((this.activeItems + this.inactiveItems) * percent) / 100
    ).toString();
  };

  ngOnInit(): void {}
}
