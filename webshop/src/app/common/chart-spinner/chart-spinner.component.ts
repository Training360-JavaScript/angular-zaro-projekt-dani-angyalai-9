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

  @Input() dataPair: any[] | null = [0, 100];

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
    if (this.dataPair)
      return Math.floor(
        ((this.dataPair[0] + this.dataPair[1]) * percent) / 100
      ).toString();
    else return '';
  };

  calculatePercent() {
    if (this.dataPair)
      this.percent =
        (this.dataPair[0] / (this.dataPair[0] + this.dataPair[1])) * 100;
  }

  ngOnInit(): void {
    this.calculatePercent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataPair']) this.dataPair = changes['dataPair'].currentValue;
    this.calculatePercent();
  }
}
