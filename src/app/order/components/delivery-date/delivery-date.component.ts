import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Submit } from '../../interfaces/submit';

@Component({
  selector: 'app-delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrls: ['./delivery-date.component.scss']
})
export class DeliveryDateComponent implements OnInit {

  form!: FormGroup;
  data: Submit = this.orderService.data;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "date": new FormControl(this.orderService.showDate(this.data.radioDateValue, this.data.dateValue),
        [
          Validators.required
        ]),
      "radioDate": new FormControl(this.data.radioDateValue,
        [
          Validators.required
        ])
    });
  }

  moveTo(step: number) {
    this.orderService.formCount = step;
    this.data.dateValue = this.orderService.showDate(this.form.value.radioDateValue, this.form.value.date);
    this.data.radioDateValue = this.form.value.radioDate;
  }
}
