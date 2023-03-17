import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharLimitPipe } from './pipes/char-limit.pipe';
import { SubtotalPipe } from './pipes/subtotal.pipe';
import { SearchProdPipe } from './pipes/search.pipe';
import { AdminPipe } from './pipes/admin.pipe';
import { OwnerPipe } from './pipes/owner.pipe';
import { RolesPipe } from './pipes/roles.pipe';



@NgModule({
  declarations: [
    CharLimitPipe,
    SubtotalPipe,
    SearchProdPipe,
    AdminPipe,
    OwnerPipe,
    RolesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharLimitPipe,
    SubtotalPipe,
    SearchProdPipe,
    AdminPipe,
    OwnerPipe,
    RolesPipe
  ]
})
export class SharedModule { }
