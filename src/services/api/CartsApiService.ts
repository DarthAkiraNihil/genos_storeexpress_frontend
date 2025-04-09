import { AbstractApiService } from "./AbstractApiService";

class CartsApiService extends AbstractApiService {

    public async addToCart(itemId: number): Promise<void> {
        return this.post(`/add/${itemId}/`, {});
    }

    public async removeFromCart(itemId: number): Promise<void> {
        return this.post(`/remove/${itemId}/`, {});
    }

}

export const CartsApi = new CartsApiService("/api/cart");
