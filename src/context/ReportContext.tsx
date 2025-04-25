import React, { createContext, ReactNode } from "react";
import {OrderApi, ReportApi} from 'services/api';


interface ReportContextProps {

    generateReceipt(orderId: number, token: string): Promise<any>;
    generateInvoice(orderId: number, token: string): Promise<any>;
    generateOrderHistory(token: string): Promise<any>;

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

    return (
        <ReportContext.Provider value={{
            generateReceipt,
            generateInvoice,
            generateOrderHistory,
        }}>
            {children}
        </ReportContext.Provider>
    );
}
