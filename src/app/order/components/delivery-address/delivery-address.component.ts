import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { countries } from 'src/assets/countries';
import { OrderService } from '../../services/order.service';
import { Submit } from '../../interfaces/submit';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  form!: FormGroup;
  countries: string[] = countries;
  data: Submit = this.orderService.data;

  ngOnInit(): void {
    this.form = new FormGroup({
      "country": new FormControl(this.data.countryValue,
        [
          Validators.required
        ]),
      'city': new FormControl(this.data.cityValue,
        [
          Validators.required,
          Validators.pattern("^[A-Za-z]*$")
        ]),
      'region': new FormControl(this.data.regionValue,
        [
          Validators.required,
          Validators.pattern("^[A-Za-z]*$")
        ]),
      'address': new FormControl(this.data.addressValue,
        [
          Validators.required
        ]),
      'zip': new FormControl(this.data.zipValue,
        [
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]),
    });
  }

  get country() { return this.form.get('country') }
  get city() { return this.form.get('city') }
  get region() { return this.form.get('region') }
  get address() { return this.form.get('address') }
  get zip() { return this.form.get('zip') }

  moveNext() {
    this.orderService.formCount = 2;
    this.data.countryValue = this.form.value.country;
    this.data.cityValue = this.form.value.city;
    this.data.regionValue = this.form.value.region;
    this.data.addressValue = this.form.value.address;
    this.data.zipValue = this.form.value.zip;
  }
}
