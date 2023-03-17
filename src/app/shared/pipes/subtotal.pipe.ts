import { Pipe, PipeTransform } from '@angular/core';
import { Basket } from 'src/app/main/interfaces/basket';

@Pipe({
  name: 'subtotal'
})
export class SubtotalPipe implements PipeTransform {

  transform(basketList: Basket[]): number {
    return basketList.reduce((acc: number, item: Basket) => acc += item.price, 0);
  }
}
