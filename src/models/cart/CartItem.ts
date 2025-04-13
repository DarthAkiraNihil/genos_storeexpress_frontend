import { Item } from "models/items";

export interface CartItem {
    item: Item;
    quantity: number;
}
