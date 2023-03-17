import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Submit } from '../../interfaces/submit';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  form!: FormGroup;
  data: Submit = this.orderService.data;

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.form = new FormGroup({

      "radioPayment": new FormControl(this.data.radioPaymentValue,
        [
          Validators.required
        ])
    });
  }

  moveTo(step: number) {
    this.orderService.formCount = step;
  }
}
