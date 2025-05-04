import { AbstractApiService } from "./AbstractApiService";
import {CartItem} from "models/cart";
import {PaginatedList} from "../../models";

class CartsApiService extends AbstractApiService {

    /**
     * Метод добавления товара в корзину
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    public async addToCart(itemId: number, token: string): Promise<void> {
        return this.post(`/add/${itemId}/`, {}, token);
    }

    /**
     * Метод удаления товара из корзины
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    public async removeFromCart(itemId: number, token: string): Promise<void> {
        return this.post(`/remove/${itemId}/`, {}, token);
    }

    /**
     * Метод инкрементирования товара в корзине
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    public async incrementItemQuantity(itemId: number, token: string): Promise<void> {
        return this.post(`/inc/${itemId}/`, {}, token);
    }

    /**
     * Метод декрементирования товара в корзине
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    public async decrementItemQuantity(itemId: number, token: string): Promise<void> {
        return this.post(`/dec/${itemId}/`, {}, token);
    }

    /**
     * Метод получения содержимого корзины
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getCart(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<CartItem>> {
        return this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

}

export const CartsApi = new CartsApiService("/api/cart");
