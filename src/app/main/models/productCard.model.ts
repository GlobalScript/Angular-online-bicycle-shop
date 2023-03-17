import { BikeResponse } from "../interfaces/bike-response";
import { Bike } from "../interfaces/bike";

export class ProductCardModel {
    private cardData;

    constructor(responseData: BikeResponse) {
        this.cardData = responseData;
    }

    public getCardData(): Bike {
        return {
            ...this.cardData,
            discountPrice: this.addDiscountPrice(this.cardData.discount, this.cardData.price),
            rating: this.addRatingArray(this.cardData.review)
        }
    }

    private addDiscountPrice(discount: number, price: number): number {
        return price - (price / 100 * discount);
    }
    
    private addRatingArray(count: { rating: number }[]): number[] {
        if (count.length <= 0) return [1];
        return Array(count[0].rating).fill(0).map((x, i) => i)
    }
}
