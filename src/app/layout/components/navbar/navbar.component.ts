import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin/services/admin.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private location: Location,
    public adminService: AdminService,
    public auth: AuthService,
    private router: Router,
    public user: UsersService
  ) { }

  adminPath(): boolean {
    const format = /\/admin\//;
    return format.test(this.location.path());
  }

  moveTo() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['auth/sign-out'])
      return;
    }
    this.router.navigate(['auth'])
  }

}
