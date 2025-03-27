import { Item } from "./Item"

interface Characteristics {
    [key: string]: any;
}

export interface DetailedItem extends Item {
    characteristics: Characteristics;
}