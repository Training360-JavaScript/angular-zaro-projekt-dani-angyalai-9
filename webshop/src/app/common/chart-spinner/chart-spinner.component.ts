import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-spinner',
  templateUrl: './chart-spinner.component.html',
  styleUrls: ['./chart-spinner.component.scss'],
})
export class ChartSpinnerComponent implements OnInit {
  @Input() itemName = '';
  @Input() color = 'info';
  @Input() unit = '';

  @Input() activeItems: number | undefined;
  @Input() inactiveItems: number | undefined;

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

  percent = 0;

  constructor() {
    if (this.activeItems && this.inactiveItems) {
      this.percent =
        (this.activeItems / (this.activeItems + this.inactiveItems)) * 100;
    }
  }

  formatTitle = (percent: number): string => {
    if (this.activeItems && this.inactiveItems) {
      return Math.floor(
        ((this.activeItems + this.inactiveItems) * percent) / 100
      ).toString();
    } else return '';
  };

  ngOnInit(): void {}
}
