import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { SignOutComponent } from './components/sign-out/signOut.component';
import { WrongAuthMessageComponent } from './components/wrong-auth-message/wrong-auth-message.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthPageComponent,
    SignOutComponent,
    WrongAuthMessageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
