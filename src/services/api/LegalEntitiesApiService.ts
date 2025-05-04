import {AbstractApiService} from "./AbstractApiService";
import {PaginatedList} from "models";
import {LegalEntity} from "models/user";

class LegalEntitiesApiService extends AbstractApiService {

    /**
     * Метод верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    public async verify(legalEntityId: string, token: string): Promise<void> {
        return this.post(`/${legalEntityId}/verify`, {}, token);
    }

    /**
     * Метод отзыва верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    public async revoke(legalEntityId: string, token: string): Promise<void> {
        return this.post(`/${legalEntityId}/revoke`, {}, token);
    }

    /**
     * Метод получения списка подтверждённых юридических лиц
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getVerified(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> {
        return this.get(`/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    /**
     * Метод получения списка юр. лиц, ожидающих верификации
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    public async getAwaiting(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> {
        return this.get(`/awaiting?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

}

export const LegalEntityApi = new LegalEntitiesApiService("/api/legal_entities");
