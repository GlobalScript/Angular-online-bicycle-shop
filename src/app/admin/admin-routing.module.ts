import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { EditPageComponent } from '../create/components/edit-page/edit-page.component';
import { RolesPageComponent } from './components/roles-page/roles-page.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { OwnerGuard } from '../auth/guards/owner.guard';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'create', canActivate: [AdminGuard],
    loadChildren: () => import('../create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'edit/:id',
    component: EditPageComponent
  },
  {
    path: 'roles', canActivate: [OwnerGuard],
    component: RolesPageComponent
  },
]

const routes: Routes = [{ path: '', component: AdminPageComponent, children: adminRoutes }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
