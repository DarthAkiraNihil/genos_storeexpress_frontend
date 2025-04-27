import { AbstractApiService } from "./AbstractApiService";
import { Discount } from "models/orders";

class DiscountApiService extends AbstractApiService {

    public async activate(itemId: number, discountData: Discount, token: string): Promise<void> {
        return this.post(`/${itemId}`, discountData, token);
    }

    public async edit(discountId: number, discountData: Discount, token: string): Promise<void> {
        return this.put(`/${discountId}`, discountData, token);
    }

    public async deactivate(discountId: number, token: string): Promise<void> {
        return this.delete(`/${discountId}/deactivate`, token);
    }

}

export const DiscountApi = new DiscountApiService("/api/discount");
