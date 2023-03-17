import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BikeResponse } from 'src/app/main/interfaces/bike-response';
import { CreateService } from '../../services/create.service';
import { CrudService } from 'src/app/create/services/crud.service';
import { FileUploadService } from '../../services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { Bike } from 'src/app/main/interfaces/bike';
import { ProductCardModel } from 'src/app/main/models/productCard.model';
import { colors } from 'src/assets/colors';
import { productSize } from 'src/assets/productSize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  colors: string[] = colors;
  sizes: string[] = productSize;
  id: string = this.activateRoute.snapshot.params['id'];
  prodId: Bike = this.crud.editProdById;

  constructor(public createService: CreateService,
    private crud: CrudService,
    public fileUploadService: FileUploadService,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.prodId) this.router.navigate(['admin/products'])
    this.createService.outColors = this.prodId?.color;
    this.createService.outSizes = this.prodId?.size;
    this.form = new FormGroup({
      "name": new FormControl(this.prodId?.name,
        [
          Validators.required,
          Validators.maxLength(35)
        ]),
      'shop': new FormControl(this.prodId?.shop,
        [
          Validators.required
        ]),
      'price': new FormControl(this.prodId?.price,
        [
          Validators.required,
          Validators.min(1)
        ]),
      'discount': new FormControl(this.prodId?.discount,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]),
      'shipping': new FormControl(this.prodId?.shipping),
      'color': new FormControl(this.prodId?.color[0],
        [
          Validators.required,
        ]),
      'size': new FormControl(this.prodId?.size[0],
        [
          Validators.required,
        ]),
      'discountUntil': new FormControl(this.prodId?.discountUntil,
        [
          Validators.required,
        ]),
      'new': new FormControl(this.prodId?.new),
      'description': new FormControl(this.prodId?.description,
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
    modalRef.componentInstance.prod = { prod, route: true };
  }

  formSubmit() {
    window.scroll({
      top: 0,
      left: 0,
    });
    const data: BikeResponse = {
      "id": '',
      "imgUrl": this.prodId.imgUrl,
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
      "review": this.prodId.review
    };
    if (this.fileUploadService.imageSrc) {
      this.fileUploadService.deleteFileByUrl(this.prodId.imgUrl);
      this.fileUploadService.uploadFile().then(() => {
        this.fileUploadService.getUrlFile()?.then((url) => {
          data.imgUrl = url;
          this.crud.updateBike(this.id, data).query.get().then(() => {
            const prod: Bike = new ProductCardModel(data).getCardData();
            this.openPreviewCard(prod);
            this.fileUploadService.clearUploadForm();
          });
        })
      })
    }
    else {
      this.crud.updateBike(this.id, data).query.get().then(() => {
        const prod: Bike = new ProductCardModel(data).getCardData();
        this.openPreviewCard(prod);
        this.fileUploadService.clearUploadForm();
      });
    }
    this.form.reset();
    this.createService.clearColorSize();
  }

  ngOnDestroy(): void {
    this.fileUploadService.clearUploadForm();
    this.createService.clearColorSize();
    this.form.reset();
  }
}
