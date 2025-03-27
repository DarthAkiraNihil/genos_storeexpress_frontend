import { Item } from "../../models/items/Item";
import { ItemType } from "../../models/items/ItemType";
import { DetailedItem } from "../../models/items/DetailedItem";
import { AbstractApiService } from "./AbstractApiService";

class ItemsApiSerivce extends AbstractApiService {

    public getList(itemType: ItemType): Promise<Item[]> {
        return this.get(`/${itemType}/`);
    }

    public getDetails(itemType: ItemType, id: number): Promise<DetailedItem> {
        return this.get(`/${itemType}/${id}`);
    }

    public getImageUrl(id: number): string {
        return `${window.location.origin}${this.baseUrl}/${id}/image`;
    }
    
}

const ItemsApi = new ItemsApiSerivce("/api/items");

export default ItemsApi;
