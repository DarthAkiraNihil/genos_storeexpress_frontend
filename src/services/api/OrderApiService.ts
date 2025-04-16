import { AbstractApiService } from "./AbstractApiService";

class OrderApiService extends AbstractApiService {

    public async getOrderDetails(id: number): Promise<Order> {}
    public async getOrders(): Promise<Order[]> {

    }
    
}

export const OrderApi = new OrderApiService("/api/orders");
