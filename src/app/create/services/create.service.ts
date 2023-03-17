import { Injectable } from '@angular/core';
import { Review } from 'src/app/main/interfaces/review';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor() { }

  outColors: string[] = [];
  outSizes: string[] = [];

  colorList(colorValue: string) {
    if (!this.outColors.includes(colorValue)) this.outColors.push(colorValue);
  }

  sizeList(sizeValue: string) {
    if (!this.outSizes.includes(sizeValue)) this.outSizes.push(sizeValue);
  }

  removeColor(value: string) {
    this.outColors = this.outColors.filter(item => item !== value);
  }

  removeSize(value: string) {
    this.outSizes = this.outSizes.filter(item => item !== value);
  }

  clearColorSize() {
    this.outColors = [];
    this.outSizes = [];
  }

  randomReview(): Review[] {
    const lorem = new LoremIpsum();
    const randomPerson = (): Review => {
      const authorName = (): string => {
        let ranName: string = lorem.generateWords(1);
        return ranName[0].toUpperCase() + ranName.slice(1);
      }
      return {
        author: `${authorName()} ${authorName()}`,
        text: lorem.generateSentences(1),
        rating: Math.floor(Math.random() * (3)) + 3,
        date: new Date().toLocaleString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
        email: 'admin@gmail.com'
      }
    }
    let reviews: Review[] = [];
    let count: number = Math.floor(Math.random() * (3)) + 3;
    for (let i = 0; i < count; i++) {
      reviews.push(randomPerson());
    }
    return reviews;
  }
}
