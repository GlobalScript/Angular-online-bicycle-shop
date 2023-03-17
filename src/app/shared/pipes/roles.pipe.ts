import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { Roles } from '../enums/roles';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(arr: User[]): User[] {
    const list: User[] = [];
    if(!arr) return list;
    return arr.filter(item => item.role === Roles.Admin || item.role === Roles.Owner)
  }
}
