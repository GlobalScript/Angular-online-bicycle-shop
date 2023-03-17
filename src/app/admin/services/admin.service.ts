import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  sideBarToggler: boolean = true;
  prodId!: string;
  searchValue!: string;

  constructor() { }

  openSide() {
    this.sideBarToggler = !this.sideBarToggler;
  }
}
