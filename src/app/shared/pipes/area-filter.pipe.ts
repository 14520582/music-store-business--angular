import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaFilter'
})
export class AreaFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 0)
      return 'Tất cả'
    return '< ' + value +' m²';
  }

}
