import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T extends { [key: string]: any }> implements PipeTransform {

  transform( list:T[] | null, phrase: string = '', key: any ): T[] | null {
    if ( !Array.isArray( list ) || !phrase ){
      return list;
    }

    phrase = phrase.toLowerCase();

    const isInside = key && key.indexOf('.') !== -1;
    console.log(key);

    if ( isInside ) {
      key = key.split('.');
    }

    if ( !key ){
      return list.filter(
        item => Object.values( item ).join(' ').toLowerCase().includes( phrase )
      );
    }

    const array: any[] = list.filter( (item:any) : any => {
      if ( !isInside ) {
        const data = String( item[key] ).toLowerCase();
        return data.includes( phrase );
      }

      const data = String( this.getValue( item, key ) ).toLowerCase();
      console.log(data);
      return data.includes( phrase );

    });

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
