import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CrudService } from 'src/app/create/services/crud.service';
import { Bike } from '../../interfaces/bike';
import { WarningMessageComponent } from '../warning-message/warning-message.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { Basket } from '../../interfaces/basket';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  prodColor!: string;
  prodSize!: string;
  id: string = this.activateRoute.snapshot.params['id'];

  constructor(
    public location: Location,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private cartService: CartService,
    public crud: CrudService
  ) { }

  ngOnInit(): void {
    this.crud.prodDataByKey(this.id)
  }

  ratingArray(value: number): number[] {
    if (value <= 0) return [1];
    return Array(value).fill(0).map((x, i) => i)
  }

  openWarningMessage(title: string): void {
    const modalRef = this.modalService.open(WarningMessageComponent);
    modalRef.componentInstance.name = title;
  }

  openSuccessMessage(prodData: Bike, color: string, size: string): void {
    const modalRef = this.modalService.open(SuccessMessageComponent);
    modalRef.componentInstance.prod = { data: prodData, color, size };
  }

  addToCart(prod: Bike): void {
    if (!this.prodColor || !this.prodSize) {
      this.openWarningMessage(prod.name);
      return;
    }
    const data: Basket = {
      basketCardId: Date.now().toString(36),
      id: this.id,
      color: this.prodColor,
      size: this.prodSize,
      name: prod.name,
      price: prod.discountPrice,
      imgUrl: prod.imgUrl
    }
    this.cartService.setToCart(data)
    this.openSuccessMessage(prod, this.prodColor, this.prodSize);
    this.prodColor = '';
    this.prodSize = '';
  }
}
