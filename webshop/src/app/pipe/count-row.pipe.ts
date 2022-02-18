import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countRow'
})
export class CountRowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
