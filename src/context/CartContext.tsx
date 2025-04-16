import React, { createContext, ReactNode } from "react";
import {CartsApi} from "services/api";
import {Cart} from "models/cart";


interface CartContextProps {

    addToCart(itemId: number, token: string): Promise<void>;
    removeFromCart(id: number, token: string): Promise<void>;

    incrementItemQuantity(id: number, token: string): Promise<void>;
    decrementItemQuantity(id: number, token: string): Promise<void>;

    getCart(token: string): Promise<Cart>;

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

    const getCart = async (token: string): Promise<Cart> => {
        return await CartsApi.getCart(token);
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