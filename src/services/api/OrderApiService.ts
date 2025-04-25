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

    public async getAllOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> {
        return await this.get(`/all?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async getDetailsOfAnyOrder(id: number, token: string): Promise<Order> {
        return await this.get(`${id}/details_of_any`, token);
    }

    public async getItemsOfAnyOrder(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> {
        return await this.get(`${id}/items_of_any?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async promoteOrder(id: number, token: string): Promise<Order> {
        return await this.post(`/${id}/promote`, {}, token);
    }

    public async payOrder(orderId: number, bankCardId: number, token: string): Promise<any> {
        return await this.post(`/${orderId}/pay/${bankCardId}`, {}, token);
    }

}

export const OrderApi = new OrderApiService("/api/orders");
