import React, { createContext, ReactNode } from "react";
import {Order, OrderItem, ShortOrderInfo} from "models/orders";
import { OrderApi } from 'services/api';
import {PaginatedList} from "../models";


interface OrderContextProps {

    getOrderDetails(id: number, token: string): Promise<Order>;
    getOrderItems(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>>

    getOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>>;
    createOrder(token: string): Promise<ShortOrderInfo>;

}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined)


export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const getOrderDetails = async (id: number, token: string): Promise<Order> => {
        return await OrderApi.getOrderDetails(id, token);
    }

    const getOrderItems = async  (id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> => {
        return await OrderApi.getOrderItems(id, token, pageNumber, pageSize);
    }
    const getOrders = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> => {
        return await OrderApi.getOrders(token, pageNumber, pageSize);
    }
    const createOrder = async (token: string): Promise<ShortOrderInfo> => {
        return await OrderApi.createOrder(token);
    }

    return (
        <OrderContext.Provider value={{
            getOrderDetails,
            getOrderItems,
            getOrders,
            createOrder,
        }}>
            {children}
        </OrderContext.Provider>
    );
}
