import { Item } from "./Item"

export interface Characteristics {
    [key: string]: any;
}

export interface DetailedItem extends Item {
    characteristics: Characteristics;
}