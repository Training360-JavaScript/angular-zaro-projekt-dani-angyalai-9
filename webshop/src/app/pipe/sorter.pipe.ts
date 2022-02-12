import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe<T extends {[key: string]: any}> implements PipeTransform {

  transform( list: T[] | null, key: string, direction: number = 1): T[] | null {

    if ( !Array.isArray( list ) || !key ){
      return list;
    }

    return list.sort(( a, b ) => {
      if ( typeof a[key]==="number" && typeof b[key]==="number"){
        if (direction===1){
          return a[key]-b[key];
        } else {
          return b[key]-a[key];
        }
      }else{
        if (direction===1){
          return String( a[key] ).toLowerCase().localeCompare( String( b[key] ).toLowerCase() );
        } else {
          return String( b[key] ).toLowerCase().localeCompare( String( a[key] ).toLowerCase() );
        }
      }
    })
  }

}
