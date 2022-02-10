import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform( list: any[], key: string ): any[] {

    if ( !Array.isArray( list ) || !key ){
      return list;
    }

    return list.sort(( a, b ) => {
      if ( typeof a[key]==="number" && typeof b[key]==="number"){
        return a[key]-b[key];
      }else{
        return String( a[key] ).toLowerCase().localeCompare( String( b[key] ).toLowerCase() );
      }
    })
  }

}
