import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { CartService } from 'src/app/main/services/cart.service';
import { Router } from '@angular/router';
import { Submit } from '../../interfaces/submit';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  form!: FormGroup;
  data: Submit = this.orderService.data;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "name": new FormControl(this.data.nameValue,
        [
          Validators.required,
          Validators.pattern("^[A-Za-z]*$"),
          Validators.minLength(2)
        ]),
      "surname": new FormControl(this.data.surnameValue,
        [
          Validators.required,
          Validators.pattern("^[A-Za-z]*$"),
          Validators.minLength(2)
        ]),
      "email": new FormControl(this.data.emailValue,
        [
          Validators.required,
          Validators.email
        ]),
      "description": new FormControl(this.data.descriptionValue)
    });
  }

  get name() { return this.form.get('name') }
  get surname() { return this.form.get('surname') }
  get email() { return this.form.get('email') }

  openSuccessMessage(name: string): void {
    const modalRef = this.modalService.open(SuccessMessageComponent);
    modalRef.componentInstance.name = name;
  }

  movePrevious() {
    this.orderService.formCount = 3
    this.data.nameValue = this.form.value.name;
    this.data.surnameValue = this.form.value.surname;
    this.data.emailValue = this.form.value.email;
    this.data.descriptionValue = this.form.value.description;
  }

  createOrder() {
    this.openSuccessMessage(this.form.value.name);
    this.cartService.removeCart();
    this.orderService.clearDataSubmit();
    this.router.navigate(['/shop']);
  }
}
