import { AbstractApiService } from "./AbstractApiService";
import {Cart, CartItem} from "models/cart";
import {PaginatedList} from "../../models";

class CartsApiService extends AbstractApiService {

    public async addToCart(itemId: number, token: string): Promise<void> {
        return this.post(`/add/${itemId}/`, {}, token);
    }

    public async removeFromCart(itemId: number, token: string): Promise<void> {
        return this.post(`/remove/${itemId}/`, {}, token);
    }

    public async incrementItemQuantity(itemId: number, token: string): Promise<void> {
        return this.post(`/inc/${itemId}/`, {}, token);
    }

    public async decrementItemQuantity(itemId: number, token: string): Promise<void> {
        return this.post(`/dec/${itemId}/`, {}, token);
    }

    public async getCart(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<CartItem>> {
        return this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

}

export const CartsApi = new CartsApiService("/api/cart");
