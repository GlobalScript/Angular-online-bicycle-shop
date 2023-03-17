import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { DeliveryAddressComponent } from './components/delivery-address/delivery-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { DeliveryDateComponent } from './components/delivery-date/delivery-date.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';


@NgModule({
  declarations: [
    OrderPageComponent,
    DeliveryAddressComponent,
    PaymentMethodComponent,
    PersonalDetailsComponent,
    DeliveryDateComponent,
    StepperComponent,
    SuccessMessageComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
