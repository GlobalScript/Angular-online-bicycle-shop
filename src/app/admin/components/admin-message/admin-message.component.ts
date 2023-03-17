import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/auth/interfaces/user';
import { UsersService } from 'src/app/auth/services/users.service';
import { Roles } from 'src/app/shared/enums/roles';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent {
  @Input() userData!: User;

  constructor(
    public activeModal: NgbActiveModal,
    private user: UsersService,
  ) { }

  closeMessage() {
    this.activeModal.dismiss('Cross click')
  }

  remove() {
    this.user.updateUserRole(this.userData.key, Roles.Customer)
    this.activeModal.dismiss('Cross click')
  }
}
