import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/create/services/crud.service';
import { AdminService } from '../../services/admin.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { Bike } from 'src/app/main/interfaces/bike';
import { WarningMessageComponent } from '../warning-message/warning-message.component';
import { Roles } from 'src/app/shared/enums/roles';

@Component({
  selector: 'app-edit',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public adminService: AdminService,
    private crud: CrudService,
    public user: UsersService
  ) { }

  prodList!: Bike[];
  inputSearch: string = '';
  prodId: string = this.adminService.prodId;
  owner: string = Roles.Owner;

  ngOnInit(): void {
    this.crud.getBikeList()
      .subscribe({
        next: (data) => {
          this.prodList = data;
        },
        error: () => {
          this.router.navigate(['**']);
        }
      })
  }

  openWarningMessage(params: { name: string, id: string, imgUrl: string }): void {
    const modalRef = this.modalService.open(WarningMessageComponent);
    modalRef.componentInstance.params = { name: params.name, imgUrl: params.imgUrl, id: params.id };
    this.adminService.prodId = params.id;
  }

  selectProdEdit(id: string) {
    this.crud.getBikeByKey(id).subscribe({
      next: (data) => {
        this.crud.editProdById = data;
        this.router.navigate([`../admin/edit/${id}`]);
      },
      error: () => {
        this.router.navigate(['../admin/products']);
      }
    })
  }

  productDetails(prodId: string) {
    this.crud.getBikeByKey(prodId).subscribe(data => {
      this.crud.detailProdById = data
      this.router.navigate([`/product-details/${prodId}`])
    });
  }
}
