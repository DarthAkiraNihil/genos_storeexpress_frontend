import { AbstractApiService } from "./AbstractApiService";
import {PaginatedList} from "models";
import { BankCard } from "models/orders/BankCard";

class CartsApiService extends AbstractApiService {

    public async addBankCard(card: BankCard, token: string): Promise<void> {
        return this.post('', card, token);
    }

    public async getList(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>> {
        return this.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async updateCard(cardId: number, updated: BankCard, token: string): Promise<void> {
        return this.put(`/${cardId}/`, updated, token);
    }

    public async deleteCard(cardId: number, token: string): Promise<void> {
        return this.delete(`${cardId}/`, token);
    }

}

export const BankCardsApi = new CartsApiService("/api/bank_cards");
