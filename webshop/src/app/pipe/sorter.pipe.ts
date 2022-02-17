import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe<T extends {[key: string]: any}> implements PipeTransform {

  transform( list: T[] | null, key: string, direction: number = 1): T[] | null {

    if ( !Array.isArray( list ) || !key ){
      return list;
    }

    return this.sort( list, key, direction );
  }

  private sort( list: T[], key: any, direction: number ): T[] {
    const isInside = key && key.indexOf('.') !== -1;

    if ( isInside ) {
      key = key.split('.');
    }

    const array: any[] = list.sort(( a: any, b: any ): number => {
      if ( !key ) {
        return a > b ? 1 : -1;
      }

      if ( !isInside ) {
        return a[ key ] > b[ key ] ? 1 : -1;
      }

      return this.getValue( a, key ) > this.getValue( b, key ) ? 1 : -1;
    });

    if ( direction === -1 ) {
      return array.reverse();
    }

    return array;
  }

  private getValue( object: any, key: string[] ) {
    for ( let i = 0, n = key.length; i < n; ++i ) {
      const k = key[ i ];
      if (!( k in object )) {
        return;
      }

      object = object[ k ];
    }

    return object;
  }

}
