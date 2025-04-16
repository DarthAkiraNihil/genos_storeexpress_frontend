import { Item } from "models/items";

export interface OrderItem {
    item: Item;
    quantity: number;
    bought_for: number;
}
