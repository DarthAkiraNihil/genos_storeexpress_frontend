import {OrderStatus} from "./OrderStatus";

export interface ShortOrderInfo {
    order_id: number;
    status: OrderStatus;
}