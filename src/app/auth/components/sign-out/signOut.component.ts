import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './signOut.component.html',
  styleUrls: ['./signOut.component.scss']
})
export class SignOutComponent {

  constructor(
    private auth: AuthService,
    public user: UsersService
  ) { }

  signOut() {
    this.auth.signOut();
  }
}
