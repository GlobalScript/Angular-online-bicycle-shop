import { Injectable } from '@angular/core';
import { Submit } from '../interfaces/submit';
import { DeliveryDays } from '../enums/delivery-days';
import { UsersService } from 'src/app/auth/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private user: UsersService) { }

  formCount: number = 1;

  data: Submit = {
    countryValue: '',
    cityValue: '',
    regionValue: '',
    addressValue: '',
    zipValue: '',
    dateValue: this.showDate(DeliveryDays.Today, ''),
    nameValue: this.user.userData.name,
    surnameValue: this.user.userData.surname,
    emailValue: this.user.userData.email,
    descriptionValue: '',
    radioDateValue: '',
    radioPaymentValue: ''
  }

  showDate(radioValue: string, value: string): string {
    const today: Date = new Date();
    const tomor: Date = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    const outDate = (day: Date): string => {
      return `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`;
    }
    if (radioValue === DeliveryDays.Today) return outDate(today);
    if (radioValue === DeliveryDays.Tomorrow) return outDate(tomor);
    return value;
  }

  clearDataSubmit() {
    for (let item in this.data) {
      let key = item as keyof Submit;
      this.data[key] = '';
    }
    this.data.dateValue = this.showDate(DeliveryDays.Today, '');
  }
}
