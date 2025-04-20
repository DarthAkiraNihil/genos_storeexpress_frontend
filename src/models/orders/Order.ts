import { OrderStatus } from "./OrderStatus";

export interface Order {
    id: number;
    count: number;
    status: OrderStatus;
    created_at: Date;
}
