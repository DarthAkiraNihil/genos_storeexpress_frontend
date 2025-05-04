import React, { createContext, ReactNode } from "react";
import {ReportApi} from 'services/api';

/**
 * Пропсы контекста отчётов
 */
interface ReportContextProps {

    /**
     * Метод генерации чека для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    generateReceipt(orderId: number, token: string): Promise<any>;

    /**
     * Метод генерации счёта-фактуры для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    generateInvoice(orderId: number, token: string): Promise<any>;

    /**
     * Метод генерации истории заказов
     * @param token Авторизационный токен
     */
    generateOrderHistory(token: string): Promise<any>;

    /**
     * Метод генерации отчёта по продажам
     * @param token Авторизационный токен
     * @param startDate Дата начала периода
     * @param endDate Дата конца периода
     */
    generateSalesReport(token: string, startDate: Date, endDate: Date): Promise<any>

}

export const ReportContext = createContext<ReportContextProps | undefined>(undefined)


export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Метод генерации чека для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    const generateReceipt = async (orderId: number, token: string): Promise<any> => {
        return await ReportApi.generateReceipt(orderId, token);
    };

    /**
     * Метод генерации счёта-фактуры для заказа
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    const generateInvoice = async (orderId: number, token: string): Promise<any> => {
        return await ReportApi.generateInvoice(orderId, token);
    };

    /**
     * Метод генерации истории заказов
     * @param token Авторизационный токен
     */
    const generateOrderHistory = async (token: string): Promise<any> => {
        return await ReportApi.generateOrderHistory(token);
    };

    /**
     * Метод генерации отчёта по продажам
     * @param token Авторизационный токен
     * @param startDate Дата начала периода
     * @param endDate Дата конца периода
     */
    const generateSalesReport = async (token: string, startDate: Date, endDate: Date): Promise<any> => {
        return await ReportApi.generateSalesReport(token, startDate, endDate);
    }

    return (
        <ReportContext.Provider value={{
            generateReceipt,
            generateInvoice,
            generateOrderHistory,
            generateSalesReport,
        }}>
            {children}
        </ReportContext.Provider>
    );
}
