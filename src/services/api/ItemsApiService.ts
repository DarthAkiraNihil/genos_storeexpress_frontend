import {ItemType, DetailedItem, Item, Review, FilterDescription} from "models/items";
import { AbstractApiService } from "./AbstractApiService";
import {PaginatedList} from "../../models";

class ItemsApiService extends AbstractApiService {

    public async getList(itemType: ItemType, pageNumber: number, pageSize: number): Promise<PaginatedList<Item>> {
        return this.get(`/${itemType}/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public async getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
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

    public async getReviews(id: number): Promise<Review[]> {
        return this.get(`/${id}/reviews`);
    }

    public async getFilterData(itemType: ItemType): Promise<FilterDescription[]> {
        return this.get(`/${itemType}/filter_data`);
    }
    
}

export const ItemsApi = new ItemsApiService("/api/items");
