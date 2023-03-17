import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { SharedModule } from '../shared/shared.module';
import { WarningMessageComponent } from './components/warning-message/warning-message.component';
import { RolesPageComponent } from './components/roles-page/roles-page.component';
import { AdminMessageComponent } from './components/admin-message/admin-message.component';
import { RoleColorDirective } from './directives/role-color.directive';
import { WorkerFoundComponent } from './components/worker-found/worker-found.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    ProductsPageComponent,
    WarningMessageComponent,
    RolesPageComponent,
    AdminMessageComponent,
    RoleColorDirective,
    WorkerFoundComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
