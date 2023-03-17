import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { SignOutComponent } from './components/sign-out/signOut.component';
import { AuthGuard } from './guards/auth.guard';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard], },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'sign-out', component: SignOutComponent },
]

const routes: Routes = [{ path: '', component: AuthPageComponent, children: authRoutes }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
