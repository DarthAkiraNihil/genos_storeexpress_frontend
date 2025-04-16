import { AbstractApiService } from "./AbstractApiService";

class OrderApiService extends AbstractApiService {

}

export const OrderApi = new OrderApiService("/api/orders");
