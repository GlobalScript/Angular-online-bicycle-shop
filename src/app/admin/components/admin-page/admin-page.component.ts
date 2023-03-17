import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(public adminService: AdminService, public user: UsersService) { }

}
