import { AbstractApiService } from "./AbstractApiService";
import { Order, ShortOrderInfo } from 'models/orders';

class OrderApiService extends AbstractApiService {

    public async getOrderDetails(id: number, token: string): Promise<Order> {
        return await this.get(`/${id}`, token);
    }
    public async getOrders(token: string): Promise<Order[]> {
        return await this.get("", token);
    }

    public async createOrder(token: string): Promise<ShortOrderInfo> {
        return await this.post("", token);
    }

}

export const OrderApi = new OrderApiService("/api/orders");
