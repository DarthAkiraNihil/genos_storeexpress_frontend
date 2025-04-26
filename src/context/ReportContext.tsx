import React, { createContext, ReactNode } from "react";
import {OrderApi, ReportApi} from 'services/api';


interface ReportContextProps {

    generateReceipt(orderId: number, token: string): Promise<any>;
    generateInvoice(orderId: number, token: string): Promise<any>;
    generateOrderHistory(token: string): Promise<any>;
    generateSalesReport(token: string, startDate: Date, endDate: Date): Promise<any>

}

export const ReportContext = createContext<ReportContextProps | undefined>(undefined)


export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const generateReceipt = async (orderId: number, token: string): Promise<any> => {
        return await ReportApi.generateReceipt(orderId, token);
    };
    const generateInvoice = async (orderId: number, token: string): Promise<any> => {
        return await ReportApi.generateInvoice(orderId, token);
    };
    const generateOrderHistory = async (token: string): Promise<any> => {
        return await ReportApi.generateOrderHistory(token);
    };

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
