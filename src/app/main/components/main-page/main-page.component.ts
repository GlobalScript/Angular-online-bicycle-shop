import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/create/services/crud.service';
import { Router } from '@angular/router';
import { Bike } from '../../interfaces/bike';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, public crud: CrudService, private cart: CartService) { }

  prodList: Bike[] = [];

  ngOnInit(): void {
    this.crud.getBikeList().subscribe({
      next: (data) => {
        this.prodList = data;
        this.cart.cartRelevance(data)
      },
      error: () => {
        this.router.navigate(['**']);
      }
    })
  }
}
