import { AbstractApiService } from "./AbstractApiService";
import {Order, OrderItem, ShortOrderInfo} from 'models/orders';
import {PaginatedList} from "../../models";

class OrderApiService extends AbstractApiService {

    public async getOrderDetails(id: number, token: string): Promise<Order> {
        return await this.get(`/${id}`, token);
    }

    public async getOrderItems(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> {
        return await this.get(`/${id}/items/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async getOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> {
        return await this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async createOrder(token: string): Promise<ShortOrderInfo> {
        return await this.post("", token);
    }

}

export const OrderApi = new OrderApiService("/api/orders");
