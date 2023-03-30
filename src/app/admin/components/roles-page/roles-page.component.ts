import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminMessageComponent } from '../admin-message/admin-message.component';
import { UsersService } from 'src/app/auth/services/users.service';
import { User } from 'src/app/auth/interfaces/user';
import { Roles } from 'src/app/shared/enums/roles';
import { Subscription } from 'rxjs'
import { WorkerFoundComponent } from '../worker-found/worker-found.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent implements OnInit, OnDestroy {

  userList!: Subscription;
  users!: User[];
  inputSearch: string = '';

  constructor(private modalService: NgbModal, private user: UsersService) { }

  ngOnInit(): void {
    this.userList = this.user.getUserListByRole().subscribe(data => {
      this.users = data
    })
  }

  openWarningMessage(user: User): void {
    const modalRef = this.modalService.open(AdminMessageComponent);
    modalRef.componentInstance.userData = user;
  }

  search() {
    this.user.getUserByEmail(this.inputSearch)
      .subscribe(data => {
        if (!data || data.role === Roles.Owner) {
          this.inputSearch = data ? 'User is blocked' : 'Not found';
          return;
        }
        const modalRef = this.modalService.open(WorkerFoundComponent);
        modalRef.componentInstance.userData = data;
        this.inputSearch = '';
        return;
      })
      this.inputSearch = 'Not found';
  }

  ngOnDestroy(): void {
    this.userList.unsubscribe();
  }
}
