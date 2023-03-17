import { Component, Input } from '@angular/core';
import { Bike } from '../../interfaces/bike';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/create/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private router: Router, private crud: CrudService) { }

  @Input() prodData!: Bike;

  productDetails(prodId: string) {
    this.crud.getBikeByKey(prodId).subscribe(data => {
      this.crud.detailProdById = data
      this.router.navigate([`/product-details/${prodId}`])
    });
  }
}
