import React, { createContext, ReactNode } from "react";
import {CartsApi} from "services/api";
import { CartItem} from "models/cart";
import {PaginatedList} from "../models";


/**
 * Пропсы контекста корзин
 */
interface CartContextProps {

    /**
     * Метод добавления товара в корзину
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    addToCart(itemId: number, token: string): Promise<void>;

    /**
     * Метод удаления товара из корзины
     * @param id Номер товара
     * @param token Авторизационный токен
     */
    removeFromCart(id: number, token: string): Promise<void>;

    /**
     * Метод инкрементирования товара в корзине
     * @param id Номер товара
     * @param token Авторизационный токен
     */
    incrementItemQuantity(id: number, token: string): Promise<void>;
    /**
     * Метод декрементирования товара в корзине
     * @param id Номер товара
     * @param token Авторизационный токен
     */
    decrementItemQuantity(id: number, token: string): Promise<void>;

    /**
     * Метод получения содержимого корзины
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getCart(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<CartItem>>;

}

export const CartContext = createContext<CartContextProps | undefined>(undefined)


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Метод добавления товара в корзину
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    const addToCart = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.addToCart(itemId, token);
    }

    /**
     * Метод удаления товара из корзины
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    const removeFromCart = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.removeFromCart(itemId, token);
    }

    /**
     * Метод инкрементирования товара в корзине
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    const incrementItemQuantity = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.incrementItemQuantity(itemId, token);
    }

    /**
     * Метод декрементирования товара в корзине
     * @param itemId Номер товара
     * @param token Авторизационный токен
     */
    const decrementItemQuantity = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.decrementItemQuantity(itemId, token);
    }

    /**
     * Метод получения содержимого корзины
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getCart = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<CartItem>> => {
        return await CartsApi.getCart(token, pageNumber, pageSize);
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
            incrementItemQuantity,
            decrementItemQuantity,
            getCart
        }}>
        {children}
        </CartContext.Provider>
    );
}