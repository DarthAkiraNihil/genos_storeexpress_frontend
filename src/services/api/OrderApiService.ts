import { AbstractApiService } from "./AbstractApiService";
import {Order, OrderItem, ShortOrderInfo} from 'models/orders';
import {PaginatedList} from "../../models";

/**
 * Класс API заказов
 */
class OrderApiService extends AbstractApiService {

    /**
     * Получение деталей заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    public async getOrderDetails(id: number, token: string): Promise<Order> {
        return await this.get(`/${id}`, token);
    }

    /**
     * Получение товаров в заказе
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getOrderItems(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> {
        return await this.get(`/${id}/items/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Получение заказов данного покупателя
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> {
        return await this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Метод создания заказа из корзины
     * @param token Авторизационный токен
     */
    public async createOrder(token: string): Promise<ShortOrderInfo> {
        return await this.post("", token);
    }

    /**
     * Метод получения всех заказов (всех покупателей)
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getAllOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> {
        return await this.get(`/all?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Метод получения деталей любого заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    public async getDetailsOfAnyOrder(id: number, token: string): Promise<Order> {
        return await this.get(`${id}/details_of_any`, token);
    }

    /**
     * Получение товаров в заказе любого заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getItemsOfAnyOrder(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> {
        return await this.get(`${id}/items_of_any?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Метод продвижения заказа по статусному графу
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    public async promoteOrder(id: number, token: string): Promise<Order> {
        return await this.post(`/${id}/promote`, {}, token);
    }

    /**
     * Метод оплаты заказа
     * @param orderId Номер заказа
     * @param bankCardId Номер банковской карты
     * @param token Авторизационный токен
     */
    public async payOrder(orderId: number, bankCardId: number, token: string): Promise<any> {
        return await this.post(`/${orderId}/pay/${bankCardId}`, {}, token);
    }

    /**
     * Метод получения заказа (имеется перевода в статус "Получен")
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    public async receiveOrder(orderId: number, token: string): Promise<any> {
        return await this.post(`/${orderId}/receive`, {}, token);
    }

    /**
     * Метод отмены заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    public async cancelOrder(id: number, token: string): Promise<any> {
        return await this.post(`/${id}/cancel`, token);
    }

}

export const OrderApi = new OrderApiService("/api/orders");
