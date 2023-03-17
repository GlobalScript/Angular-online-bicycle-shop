import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../enums/roles';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(value: string):boolean {
    return value === Roles.Admin;
  }

}
