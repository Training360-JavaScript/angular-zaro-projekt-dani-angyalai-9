import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-spinner',
  templateUrl: './chart-spinner.component.html',
  styleUrls: ['./chart-spinner.component.scss'],
})
export class ChartSpinnerComponent implements OnInit {
  @Input() itemName = '';
  @Input() color = 'info';
  @Input() unit = '';

  @Input() activeItems: number | null = 0;
  @Input() inactiveItems: number | null = 0;

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

  formatTitle = (percent: number): string => {
    if (this.activeItems && this.inactiveItems) {
      return Math.floor(
        ((this.activeItems + this.inactiveItems) * percent) / 100
      ).toString();
    } else return '';
  };

  calculatePercent() {
    if (this.activeItems && this.inactiveItems) {
      this.percent =
        (this.activeItems / (this.activeItems + this.inactiveItems)) * 100;
    }
    console.log(this.percent, this.activeItems, this.inactiveItems);
  }

  ngOnInit(): void {
    this.calculatePercent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeItems'])
      this.activeItems = changes['activeItems'].currentValue;
    if (changes['inactiveItems'])
      this.inactiveItems = changes['inactiveItems'].currentValue;
    this.calculatePercent();
  }
}
