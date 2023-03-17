import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { CrudService } from 'src/app/create/services/crud.service';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.scss']
})
export class WarningMessageComponent implements OnDestroy {

  @Input() params!: { name: string, imgUrl: string, id: string };

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private crud: CrudService,
  ) { }

  closeMessage() {
    this.adminService.prodId = '';
    this.activeModal.dismiss('Cross click')
  }

  remove() {
    this.crud.deleteBike(this.params.id, this.params.imgUrl);
    this.adminService.prodId = '';
    this.activeModal.dismiss('Cross click')
  }

  ngOnDestroy(): void {
    this.adminService.prodId = '';
  }
}
