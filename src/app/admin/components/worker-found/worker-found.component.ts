import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/auth/services/users.service';
import { Roles } from 'src/app/shared/enums/roles';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-worker-found',
  templateUrl: './worker-found.component.html',
  styleUrls: ['./worker-found.component.scss']
})
export class WorkerFoundComponent {

  @Input() userData!: User;

  constructor(
    public activeModal: NgbActiveModal,
    private user: UsersService,
  ) { }

  closeMessage() {
    this.activeModal.dismiss('Cross click')
  }


  appoint(): void {
    this.user.updateUserRole(this.userData.key, Roles.Admin)
    this.activeModal.dismiss('Cross click')
  }
}
