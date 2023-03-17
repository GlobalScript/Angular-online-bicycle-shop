import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/components/main-page/main-page.component';
import { ProductDetailsComponent } from './main/components/product-details/product-details.component';
import { OrderGuard } from './order/guards/order.guard';
import { AdminOwnerGuard } from './auth/guards/admin-owner.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    component: MainPageComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [OrderGuard]
  },
  {
    path: 'admin', canActivate: [AdminOwnerGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
