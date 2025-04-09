import { ItemType, DetailedItem, Item, Review } from "models/items";
import { AbstractApiService } from "./AbstractApiService";

class ItemsApiService extends AbstractApiService {

    public async getList(itemType: ItemType): Promise<Item[]> {
        return this.get(`/${itemType}/`);
    }

    public async getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
    }

    public async createItem(itemData: DetailedItem): Promise<DetailedItem> {
        return this.post('', itemData);
    }

    public async updateItem(id: number, updatedItemData: DetailedItem): Promise<any> {
        return this.put(`${id}`, updatedItemData);
    }

    public async deleteItem(itemType: ItemType, id: number): Promise<any> {
        return this.delete(`/${itemType}/${id}`);
    }

    public async getReviews(id: number): Promise<Review[]> {
        return this.get(`/${id}/reviews`);
    }
    
}

export const ItemsApi = new ItemsApiService("/api/items");
