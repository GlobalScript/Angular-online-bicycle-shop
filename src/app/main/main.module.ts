import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { DiscountColorDirective } from './directives/discount-color.directive';
import { WarningMessageComponent } from './components/warning-message/warning-message.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { BasketDropdownComponent } from './components/basket-dropdown/basket-dropdown.component';
import { NgbDropdownModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { UserReviewComponent } from './components/user-review/user-review.component';


@NgModule({
  declarations: [
    MainPageComponent,
    CardComponent,
    ProductDetailsComponent,
    DiscountColorDirective,
    WarningMessageComponent,
    SuccessMessageComponent,
    BasketDropdownComponent,
    UserReviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbDropdownModule,
    NgbRating
  ],
  exports: [
    BasketDropdownComponent
  ]
})
export class MainModule { }
