import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../enums/roles';

@Pipe({
  name: 'owner'
})
export class OwnerPipe implements PipeTransform {

  transform(value: string): boolean {
   return value === Roles.Owner;
  }

}
