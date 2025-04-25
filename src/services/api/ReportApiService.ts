import { AbstractApiService } from "./AbstractApiService";

class ReportApiService extends AbstractApiService {

    public async generateReceipt(orderId: number, token: string): Promise<any> {
        return this.get(`/receipt/${orderId}`, token, true);
    }

    public async generateInvoice(orderId: number, token: string): Promise<any> {
        return this.get(`/invoice/${orderId}`, token, true);
    }

    public async generateOrderHistory(token: string): Promise<any> {
        return this.get('/order_history', token, true);
    }

}

export const ReportApi = new ReportApiService("/api/reports");
