import React, { createContext, ReactNode } from "react";
import {Order, OrderItem, ShortOrderInfo} from "models/orders";
import { OrderApi } from 'services/api';
import {PaginatedList} from "../models";

/**
 * Пропсы контекста заказов
 */
interface OrderContextProps {

    /**
     * Получение деталей заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    getOrderDetails(id: number, token: string): Promise<Order>;

    /**
     * Получение товаров в заказе
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getOrderItems(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>>

    /**
     * Получение заказов данного покупателя
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>>;

    /**
     * Метод создания заказа из корзины
     * @param token Авторизационный токен
     */
    createOrder(token: string): Promise<ShortOrderInfo>;

    /**
     * Метод получения всех заказов (всех покупателей)
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getAllOrders(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>>;

    /**
     * Получение товаров в заказе любого заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getItemsOfAnyOrder(id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>>;

    /**
     * Метод получения деталей любого заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    getDetailsOfAnyOrder(id: number, token: string): Promise<Order>

    /**
     * Метод продвижения заказа по статусному графу
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    promoteOrder(id: number, token: string): Promise<Order>;

    /**
     * Метод оплаты заказа
     * @param orderId Номер заказа
     * @param bankCardId Номер банковской карты
     * @param token Авторизационный токен
     */
    payOrder(orderId: number, bankCardId: number, token: string): Promise<any>

    /**
     * Метод получения заказа (имеется перевода в статус "Получен")
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    receiveOrder(orderId: number, token: string): Promise<any>

    /**
     * Метод отмены заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    cancelOrder(id: number, token: string): Promise<any>

}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined)


export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Получение деталей заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    const getOrderDetails = async (id: number, token: string): Promise<Order> => {
        return await OrderApi.getOrderDetails(id, token);
    }

    /**
     * Получение товаров в заказе
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getOrderItems = async  (id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> => {
        return await OrderApi.getOrderItems(id, token, pageNumber, pageSize);
    }

    /**
     * Получение заказов данного покупателя
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getOrders = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> => {
        return await OrderApi.getOrders(token, pageNumber, pageSize);
    }

    /**
     * Метод создания заказа из корзины
     * @param token Авторизационный токен
     */
    const createOrder = async (token: string): Promise<ShortOrderInfo> => {
        return await OrderApi.createOrder(token);
    }

    /**
     * Метод получения всех заказов (всех покупателей)
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getAllOrders = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<Order>> => {
        return OrderApi.getAllOrders(token, pageNumber, pageSize)
    };

    /**
     * Получение товаров в заказе любого заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getItemsOfAnyOrder = async (id: number, token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<OrderItem>> => {
        return OrderApi.getItemsOfAnyOrder( id, token, pageNumber, pageSize)
    };

    /**
     * Метод продвижения заказа по статусному графу
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    const promoteOrder = async (id: number, token: string): Promise<Order> => {
        return OrderApi.promoteOrder(id, token)
    };

    /**
     * Метод продвижения заказа по статусному графу
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
    const getDetailsOfAnyOrder = async (id: number, token: string): Promise<Order> => {
        return await OrderApi.getDetailsOfAnyOrder(id, token)
    }

    /**
     * Метод оплаты заказа
     * @param orderId Номер заказа
     * @param bankCardId Номер банковской карты
     * @param token Авторизационный токен
     */
    const payOrder = async (orderId: number, bankCardId: number, token: string): Promise<any> => {
        return await OrderApi.payOrder(orderId, bankCardId, token);
    }

    /**
     * Метод получения заказа (имеется перевода в статус "Получен")
     * @param orderId Номер заказа
     * @param token Авторизационный токен
     */
    const receiveOrder = async (orderId: number, token: string): Promise<any> => {
        return await OrderApi.receiveOrder(orderId, token);
    }

    /**
     * Метод отмены заказа
     * @param id Номер заказа
     * @param token Авторизационный токен
     */
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
