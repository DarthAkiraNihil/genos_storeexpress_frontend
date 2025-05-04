import { AbstractApiService } from "./AbstractApiService";
import { Discount } from "models/orders";

class DiscountApiService extends AbstractApiService {

    /**
     * Метод активации скидки
     * @param itemId Номер товара
     * @param discountData Данные скидки
     * @param token Авторизационный токен
     */
    public async activate(itemId: number, discountData: Discount, token: string): Promise<void> {
        return this.post(`/${itemId}`, discountData, token);
    }

    /**
     * Метод обновления скидки
     * @param discountId Номер скидки
     * @param discountData Обновлённые данные скидки
     * @param token Авторизационный токен
     */
    public async edit(discountId: number, discountData: Discount, token: string): Promise<void> {
        return this.put(`/${discountId}`, discountData, token);
    }

    /**
     * Деактивация скидки
     * @param discountId Номер скидки
     * @param token Авторизационный токен
     */
    public async deactivate(discountId: number, token: string): Promise<void> {
        return this.delete(`/${discountId}/deactivate`, token);
    }

}

export const DiscountApi = new DiscountApiService("/api/discount");
