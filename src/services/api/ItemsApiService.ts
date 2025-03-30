import { Item } from "../../models/items/Item";
import { ItemType } from "../../models/items/ItemType";
import { DetailedItem } from "../../models/items/DetailedItem";
import { AbstractApiService } from "./AbstractApiService";

class ItemsApiSerivce extends AbstractApiService {

    public getList(itemType: ItemType): Promise<Item[]> {
        return this.get(`/${itemType}/`);
    }

    public async getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
    }

    public createItem(itemData: DetailedItem): Promise<DetailedItem> {
        return this.post('', itemData);
    }
    
}

const ItemsApi = new ItemsApiSerivce("/api/items");

export default ItemsApi;
