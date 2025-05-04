import { AbstractApiService } from "./AbstractApiService";
import {PaginatedList} from "models";
import { BankCard } from "models/orders/BankCard";

class CartsApiService extends AbstractApiService {

    /**
     * Метод добавления банковской карты
     * @param card Данные карты
     * @param token Авторизационный токен
     */
    public async addBankCard(card: BankCard, token: string): Promise<void> {
        return this.post('', card, token);
    }

    /**
     * Метод получения списка банковских карт
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getList(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>> {
        return this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Метод обновления банковской карты
     * @param cardId Идентификатор банковской карты
     * @param updated Обновлённые данные
     * @param token Авторизационный токен
     */
    public async updateCard(cardId: number, updated: BankCard, token: string): Promise<void> {
        return this.put(`/${cardId}/`, updated, token);
    }

    /**
     * Метод удаление банковской карты
     * @param cardId Идентификатор банковской карты
     * @param token Авторизационный токен
     */
    public async deleteCard(cardId: number, token: string): Promise<void> {
        return this.delete(`${cardId}/`, token);
    }

}

export const BankCardsApi = new CartsApiService("/api/bank_cards");
