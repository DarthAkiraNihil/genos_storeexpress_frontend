import {AbstractApiService} from "./AbstractApiService";
import {PaginatedList} from "models";
import {LegalEntity} from "models/user";

class LegalEntitiesApiService extends AbstractApiService {

    public async verify(legalEntityId: string, token: string): Promise<void> {
        return this.post(`/${legalEntityId}/verify`, {}, token);
    }
    public async revoke(legalEntityId: string, token: string): Promise<void> {
        return this.post(`/${legalEntityId}/revoke`, {}, token);
    }

    public async getVerified(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> {
        return this.get(`/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

    public async getAwaiting(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> {
        return this.get(`/awaiting?pageNumber=${pageNumber}&pageSize=${pageSize}`, token);
    }

}

export const LegalEntityApi = new LegalEntitiesApiService("/api/legal_entities");
