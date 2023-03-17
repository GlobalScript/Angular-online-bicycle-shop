import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from 'src/app/main/interfaces/bike';

@Pipe({
  name: 'searchProd'
})
export class SearchProdPipe implements PipeTransform {

  transform(arr: Bike[], value: string): Bike[] {
    if (!value) {
      return arr;
    }
    value = value.toLowerCase();
    return arr.filter(
      x => x.name.toLowerCase().includes(value)
    )
  }
}
