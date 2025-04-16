import React, { createContext, ReactNode } from "react";
import { Order, ShortOrderInfo } from "models/orders";
import { OrderApi } from 'services/api';


interface OrderContextProps {

    getOrderDetails(id: number, token: string): Promise<Order>;
    getOrders(token: string): Promise<Order[]>;
    createOrder(token: string): Promise<ShortOrderInfo>;

}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined)


export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const getOrderDetails = async (id: number, token: string): Promise<Order> => {
        return await OrderApi.getOrderDetails(id, token);
    }
    const getOrders = async (token: string): Promise<Order[]> => {
        return await OrderApi.getOrders(token);
    }
    const createOrder = async (token: string): Promise<ShortOrderInfo> => {
        return await OrderApi.createOrder(token);
    }

    return (
        <OrderContext.Provider value={{
            getOrderDetails,
            getOrders,
            createOrder,
        }}>
            {children}
        </OrderContext.Provider>
    );
}
