import { AbstractApiService } from "./AbstractApiService";
import { Cart } from "models/cart";

class CartsApiService extends AbstractApiService {

    public async addToCart(itemId: number): Promise<void> {
        return this.post(`/add/${itemId}/`, {});
    }

    public async removeFromCart(itemId: number): Promise<void> {
        return this.post(`/remove/${itemId}/`, {});
    }

    public async incrementItemQuantity(itemId: number): Promise<void> {
        return this.post(`/inc/${itemId}/`, {});
    }

    public async decrementItemQuantity(itemId: number): Promise<void> {
        return this.post(`/dec/${itemId}/`, {});
    }

    public async getCart(): Promise<Cart> {
        return this.get('');
    }

}

export const CartsApi = new CartsApiService("/api/cart");
