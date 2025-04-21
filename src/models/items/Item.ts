import { ItemType } from "./ItemType";
import {Review} from "./Review";

export interface Item {
    id: number;
    name: string;
    model: string;
    description: string;
    price: number;
    item_type : ItemType;
    is_in_cart: boolean;
    left_review: Review | null;
    overall_rating: number;
    reviews_count: number;
}