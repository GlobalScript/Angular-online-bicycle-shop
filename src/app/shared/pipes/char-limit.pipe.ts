import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charLimit'
})
export class CharLimitPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    if (text.length > limit) return text.slice(0, limit);
    return text;
  }

}
