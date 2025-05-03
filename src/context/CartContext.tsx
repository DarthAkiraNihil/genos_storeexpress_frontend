import React, { createContext, ReactNode } from "react";
import {CartsApi} from "services/api";
import { CartItem} from "models/cart";
import {PaginatedList} from "../models";


interface CartContextProps {

    addToCart(itemId: number, token: string): Promise<void>;
    removeFromCart(id: number, token: string): Promise<void>;

    incrementItemQuantity(id: number, token: string): Promise<void>;
    decrementItemQuantity(id: number, token: string): Promise<void>;

    getCart(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<CartItem>>;

}

export const CartContext = createContext<CartContextProps | undefined>(undefined)


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const addToCart = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.addToCart(itemId, token);
    }

    const removeFromCart = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.removeFromCart(itemId, token);
    }

    const incrementItemQuantity = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.incrementItemQuantity(itemId, token);
    }

    const decrementItemQuantity = async (itemId: number, token: string): Promise<void> => {
        return await CartsApi.decrementItemQuantity(itemId, token);
    }

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