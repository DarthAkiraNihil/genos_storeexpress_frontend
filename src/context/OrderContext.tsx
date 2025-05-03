import React, { createContext, ReactNode } from "react";
import {Order, OrderItem, ShortOrderInfo} from "models/orders";
import { OrderApi } from 'services/api';
import {PaginatedList} from "../models";


interface OrderContextProps {

    getOrderDetails(id: number, token: string): Promise<Order>;
    getOrderItems(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>>

    getOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>>;
    createOrder(token: string): Promise<ShortOrderInfo>;

    getAllOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>>;
    getItemsOfAnyOrder(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>>;
    getDetailsOfAnyOrder(id: number, token: string): Promise<Order>
    promoteOrder(id: number, token: string): Promise<Order>;

    payOrder(orderId: number, bankCardId: number, token: string): Promise<any>

    receiveOrder(orderId: number, token: string): Promise<any>
    cancelOrder(id: number, token: string): Promise<any>

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

    const getAllOrders = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> => {
        return OrderApi.getAllOrders(token, pageNumber, pageSize)
    };
    const getItemsOfAnyOrder = async (id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> => {
        return OrderApi.getItemsOfAnyOrder( id, token, pageNumber, pageSize)
    };
    const promoteOrder = async (id: number, token: string): Promise<Order> => {
        return OrderApi.promoteOrder(id, token)
    };

    const getDetailsOfAnyOrder = async (id: number, token: string): Promise<Order> => {
        return await OrderApi.getDetailsOfAnyOrder(id, token)
    }

    const payOrder = async (orderId: number, bankCardId: number, token: string): Promise<any> => {
        return await OrderApi.payOrder(orderId, bankCardId, token);
    }

    const receiveOrder = async (orderId: number, token: string): Promise<any> => {
        return await OrderApi.receiveOrder(orderId, token);
    }
    const cancelOrder = async (id: number, token: string): Promise<any> => {
        return await OrderApi.cancelOrder(id, token);
    }

    return (
        <OrderContext.Provider value={{
            getOrderDetails,
            getOrderItems,
            getOrders,
            createOrder,

            getAllOrders,
            getDetailsOfAnyOrder,
            getItemsOfAnyOrder,
            promoteOrder,

            payOrder,
            receiveOrder,
            cancelOrder,
        }}>
            {children}
        </OrderContext.Provider>
    );
}
