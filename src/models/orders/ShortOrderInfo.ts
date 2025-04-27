import {OrderStatus} from "./OrderStatus";

export interface ShortOrderInfo {
    id: number;
    status: OrderStatus;
    created_at: Date;
    count: number;
}
