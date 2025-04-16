import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

export interface Order {
    id: number;
    items: OrderItem[];
    status: OrderStatus;
    created_at: Date;
}
