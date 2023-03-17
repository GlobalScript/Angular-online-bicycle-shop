import { BikeResponse } from "./bike-response";

export interface Bike extends BikeResponse {
    discountPrice: number;
    rating: number[];
}
