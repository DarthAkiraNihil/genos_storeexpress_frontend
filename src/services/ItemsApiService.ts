import { AbstractApiService } from "./AbstractAPIService";
import { Item } from "../models/Item";

class ItemsApiSerivce extends AbstractApiService {
    public getList(itemType: string): Item[] {
        return this.get("/");
    }
}

export default new ItemsApiSerivce("/api/items");
