import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/auth/services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public user: UsersService, private auth: AuthService) { }

  contactPageRoute() {
    this.router.navigate(['/shop']);
  }

  ngOnInit(): void {
    this.auth.getUserSession();
  }

  moveTo() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['auth/sign-out'])
      return;
    }
    this.router.navigate(['auth'])
  }

}
