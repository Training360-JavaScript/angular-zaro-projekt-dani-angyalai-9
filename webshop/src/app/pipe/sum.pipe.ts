import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform( list: any[], colName: string): any {

    return this.getTotal(list, colName) || '';
  }

  getTotal(list: any[], colName: string): number {
    const total = list.map(row =>
      row[colName]).reduce((item, value) =>
      value ? item + Number(value) : item, 0);
    return total?.toFixed(2);
  }
}
