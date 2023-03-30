import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/create/services/crud.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-basket-dropdown',
  templateUrl: './basket-dropdown.component.html',
  styleUrls: ['./basket-dropdown.component.scss']
})
export class BasketDropdownComponent {

  constructor(
    public cartService: CartService,
    private router: Router,
    public crud: CrudService,
    public auth: AuthService
  ) { }

  detailPageRoute(id: string): void {
    this.crud.getBikeByKey(id).subscribe(data => {
      this.crud.detailProdById = data;
      this.router.navigate([`/product-details/${id}`])
    });
  }

  signIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  orderPageRoute(): void {
    this.router.navigate(['/order']);
  }
}
