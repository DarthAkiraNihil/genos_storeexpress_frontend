import {ItemType, DetailedItem, Item, Review} from "models/items";
import { AbstractApiService } from "./AbstractApiService";
import {PaginatedList} from "models";
import {FilterDescription, ItemFilter} from 'models/filter';

class ItemsApiService extends AbstractApiService {

    public async getList(itemType: ItemType, pageNumber: number, pageSize: number, filters: ItemFilter | undefined): Promise<PaginatedList<Item>> {
        if (filters) {
            return this.get(`/${itemType}/?pageNumber=${pageNumber}&pageSize=${pageSize}&filters=${JSON.stringify(filters)}`);
        }

        return this.get(`/${itemType}/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public async getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
    }

    public async setImage(id: number, data: FormData, token: string): Promise<void> {
        return this.post(`/${id}/set_image`, data, token);
    }

    public async createItem(itemData: DetailedItem, token: string): Promise<DetailedItem> {
        return this.post('', itemData, token);
    }

    public async updateItem(id: number, updatedItemData: DetailedItem, token: string): Promise<any> {
        return this.put(`${id}`, updatedItemData, token);
    }

    public async deleteItem(itemType: ItemType, id: number, token: string): Promise<any> {
        return this.delete(`/${itemType}/${id}`, token);
    }

    public async getReviews(id: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Review>> {
        return this.get(`/${id}/reviews/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public async leaveReview(id: number, review: Review, token: string): Promise<any> {
        return this.post(`/${id}/leave_review`, review, token);
    }

    public async getFilterData(itemType: ItemType): Promise<FilterDescription[]> {
        return this.get(`/${itemType}/filter_data`);
    }
    
}

export const ItemsApi = new ItemsApiService("/api/items");
