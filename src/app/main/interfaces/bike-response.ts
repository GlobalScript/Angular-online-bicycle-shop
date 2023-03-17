import { Review } from "./review";

export interface BikeResponse {
    id: string;
    imgUrl: string;
    price: number;
    discount: number;
    shop?: string;
    name: string;
    description: string;
    shipping?: string | null;
    discountUntil?: string;
    new: boolean;
    color: string[];
    size: string[];
    review: Review [];
}
