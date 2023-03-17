import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BikeResponse } from 'src/app/main/interfaces/bike-response';
import { CreateService } from '../../services/create.service';
import { CrudService } from 'src/app/create/services/crud.service';
import { FileUploadService } from '../../services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { Bike } from 'src/app/main/interfaces/bike';
import { colors } from 'src/assets/colors';
import { productSize } from 'src/assets/productSize';
import { ProductCardModel } from 'src/app/main/models/productCard.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  colors: string[] = colors;
  sizes: string[] = productSize;

  constructor(public createService: CreateService,
    private crud: CrudService,
    public fileUploadService: FileUploadService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "name": new FormControl('',
        [
          Validators.required,
          Validators.maxLength(35)
        ]),
      'shop': new FormControl('',
        [
          Validators.required
        ]),
      'price': new FormControl('',
        [
          Validators.required,
          Validators.min(1)
        ]),
      'discount': new FormControl('',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]),
      'shipping': new FormControl(''),
      'color': new FormControl('',
        [
          Validators.required,
        ]),
      'size': new FormControl('',
        [
          Validators.required,
        ]),
      'discountUntil': new FormControl('',
        [
          Validators.required,
        ]),
      'new': new FormControl(''),
      'description': new FormControl('',
        [
          Validators.required,
        ])
    });
  }

  get name() { return this.form.get('name') }
  get shop() { return this.form.get('shop') }
  get price() { return this.form.get('price') }
  get discount() { return this.form.get('discount') }
  get color() { return this.form.get('color') }
  get size() { return this.form.get('size') }
  get discountUntil() { return this.form.get('discountUntil') }
  get description() { return this.form.get('description') }

  removeColor(value: string) {
    this.createService.removeColor(value);
    if (this.createService.outColors.length <= 0) this.color?.setValue('');
  }
  removeSize(value: string) {
    this.createService.removeSize(value);
    if (this.createService.outSizes.length <= 0) this.size?.setValue('');
  }

  openPreviewCard(prod: Bike): void {
    const modalRef = this.modalService.open(PreviewCardComponent);
    modalRef.componentInstance.prod = { prod, route: false };
  }

  formSubmit() {
    window.scroll({
      top: 0,
      left: 0,
    });
    const data: BikeResponse = {
      "id": '',
      "imgUrl": '',
      "price": this.form.value.price,
      "discount": this.form.value.discount,
      "shop": this.form.value.shop,
      "name": this.form.value.name,
      "description": this.form.value.description,
      "shipping": this.form.value.shipping ? "Free shipping" : null,
      "discountUntil": this.form.value.discountUntil,
      "new": this.form.value.new || false,
      "color": this.createService.outColors,
      "size": this.createService.outSizes,
      "review": this.createService.randomReview()
    };
    this.fileUploadService.uploadFile().then(() => {
      this.fileUploadService.getUrlFile()?.then((url) => {
        this.fileUploadService.fileUrl = url;
        data.imgUrl = url;
        this.crud.addBike(data).query.get().then(() => {
          const prod: Bike = new ProductCardModel(data).getCardData();
          this.openPreviewCard(prod);
          this.fileUploadService.clearUploadForm();
        });
      })
    })
    this.form.reset();
    this.createService.clearColorSize();
  }

  ngOnDestroy(): void {
    this.fileUploadService.clearUploadForm();
    this.createService.clearColorSize();
  }
}
