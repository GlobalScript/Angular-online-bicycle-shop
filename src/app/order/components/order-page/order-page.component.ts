import { Component, OnDestroy } from "@angular/core";
import { OrderService } from "../../services/order.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnDestroy {

  constructor(public orderService: OrderService) { }

  ngOnDestroy() {
    this.orderService.formCount = 1;
  }
}
