import { ItemType } from "./ItemType";

export interface Item {
    id: number;
    name: string;
    model: string;
    description: string;
    price: number;
    item_type : ItemType;
    overall_rating: number;
}