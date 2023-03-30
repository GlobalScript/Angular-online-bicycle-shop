import { Injectable } from '@angular/core';
import { Basket } from '../interfaces/basket';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Bike } from '../interfaces/bike';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  basketMark: boolean = false;
  currentCart: Basket[] = [];

  constructor(private location: Location, private router: Router) {
    if (localStorage.getItem('basketOfGoods')) this.basketMark = true;
  }

  private getLocalStorage(): Basket[] | null {
    const cookieData: string | null = localStorage.getItem('basketOfGoods');
    if (cookieData) return JSON.parse(cookieData);
    return null;
  }

  private setLocalStorage(data: Basket[]): void {
    const stringData: string = JSON.stringify(data);
    localStorage.setItem('basketOfGoods', stringData);
  }

  setToCart(prodData: Basket): void {
    const getData: Basket[] | null = this.getLocalStorage();
    if (!getData) {
      this.setLocalStorage([prodData]);
      this.basketMark = true;
    }
    else {
      getData.push(prodData)
      this.setLocalStorage(getData);
    }
  }

  getFromCart(): Basket[] {
    return this.getLocalStorage() || [];
  }

  removeProdFromCart(basketId: string) {
    const getData: Basket[] | null = this.getLocalStorage()
    if (getData) {
      const data = getData.filter(item => basketId !== item.basketCardId);
      if (data.length <= 0) {
        localStorage.removeItem('basketOfGoods');
        this.basketMark = false;
        if (this.router.url === "/order") this.location.back();
        return;
      }
      this.setLocalStorage(data);
    }
  }

  removeCart() {
    localStorage.removeItem('basketOfGoods');
    this.basketMark = false;
  }

  cartRelevance(prodList: Bike[]) {
    this.currentCart = this.getFromCart()
    this.removeCart();
    const prodObj: { [type: string]: Bike } = prodList.reduce((acc, prod) => {
      acc[prod.id] = prod;
      return acc
    }, Object.assign({}));
    this.currentCart.forEach(cartItem => {
      if (prodObj[cartItem.id]) {
        const prod: Bike = prodObj[cartItem.id];
        const availables: Basket = {
          id: prod.id,
          basketCardId: cartItem.basketCardId,
          color: cartItem.color,
          size: cartItem.size,
          price: prod.price,
          imgUrl: prod.imgUrl,
          name: prod.name
        }
        this.setToCart(availables);
      }
    })
  }
}
