import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 0)
      return 'Tất cả'
    if(value === 10)
      return '> 10 tỷ'
    return '< ' + value +' tỷ';
  }

}
