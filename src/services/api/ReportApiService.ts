import { AbstractApiService } from "./AbstractApiService";

class ReportApiService extends AbstractApiService {

    /**
     * Метод генерации чека для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    public async generateReceipt(orderId: number, token: string): Promise<any> {
        return this.get(`/receipt/${orderId}`, token, true);
    }

    /**
     * Метод генерации счёта-фактуры для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    public async generateInvoice(orderId: number, token: string): Promise<any> {
        return this.get(`/invoice/${orderId}`, token, true);
    }

    /**
     * Метод генерации истории заказов
     * @param token Авторизационный токен
     */
    public async generateOrderHistory(token: string): Promise<any> {
        return this.get('/order_history', token, true);
    }

    /**
     * Метод генерации отчёта по продажам
     * @param token Авторизационный токен
     * @param startDate Дата начала периода
     * @param endDate Дата конца периода
     */
    public async generateSalesReport(token: string, startDate: Date, endDate: Date): Promise<any> {
        const s = startDate.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        const e = endDate.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        return this.get(`/sales_report?startDate=${s}&endDate=${e}`, token, true);
    }

}

export const ReportApi = new ReportApiService("/api/reports");
