import {ItemType, DetailedItem, Item, Review} from "models/items";
import { AbstractApiService } from "./AbstractApiService";
import {PaginatedList} from "models";
import {FilterDescription, ItemFilter} from 'models/filter';

class ItemsApiService extends AbstractApiService {

    /**
     * Метод получения списка товаров
     * @param itemType Тип товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     * @param filters Фильтры, накладываемые на список
     */
    public async getList(itemType: ItemType, pageNumber: number, pageSize: number, filters: ItemFilter | undefined): Promise<PaginatedList<Item>> {
        if (filters) {
            return this.get(`/${itemType}/?pageNumber=${pageNumber}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}`);
        }

        return this.get(`/${itemType}/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    /**
     * Метод получения детальной информации о товаре
     * @param id Номер товара
     * @param itemType Тип товара
     */
    public async getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    /**
     * Метод получения ссылки на изображение товара
     * @param id Номер товара
     */
    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
    }

    /**
     * Метод установки изображения на товар
     * @param id Номер товара
     * @param data Данные об изображении
     * @param token Авторизационный токен
     */
    public async setImage(id: number, data: FormData, token: string): Promise<void> {
        return this.post(`/${id}/set_image`, data, token);
    }

    /**
     * Метод создания товара
     * @param itemData Данные о создаваемом товаре
     * @param token Авторизационный токен
     */
    public async createItem(itemData: DetailedItem, token: string): Promise<DetailedItem> {
        return this.post('', itemData, token);
    }

    /**
     * Метод обновления информации о товаре
     * @param id Номер товара
     * @param updatedItemData Обновлённые данные
     * @param token Авторизационный токен
     */
    public async updateItem(id: number, updatedItemData: DetailedItem, token: string): Promise<any> {
        return this.put(`${id}`, updatedItemData, token);
    }

    /**
     * Удаление товара
     * @param id Номер товара
     * @param itemType Тип товара
     * @param token Авторизационный токен
     */
    public async deleteItem(itemType: ItemType, id: number, token: string): Promise<any> {
        return this.delete(`/${itemType}/${id}`, token);
    }

    /**
     * Получение отзывов на товар
     * @param id Номер товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getReviews(id: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Review>> {
        return this.get(`/${id}/reviews/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    /**
     * Метод для оставления отзыва на товар
     * @param id Номер товара
     * @param review Данные отзыва
     * @param token Авторизационный токен
     */
    public async leaveReview(id: number, review: Review, token: string): Promise<any> {
        return this.post(`/${id}/leave_review`, review, token);
    }

    /**
     * Получение данных о фильтрах на товар
     * @param itemType Тип товара
     */
    public async getFilterData(itemType: ItemType): Promise<FilterDescription[]> {
        return this.get(`/${itemType}/filter_data`);
    }
    
}

export const ItemsApi = new ItemsApiService("/api/items");
