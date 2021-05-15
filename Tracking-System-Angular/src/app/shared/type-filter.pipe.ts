import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'TypeFilter'})
export class TypeFilterPipe implements PipeTransform {
  transform(products: any[], productType: string): any[] {
    return products.filter(p => p.type == productType);
  }
}