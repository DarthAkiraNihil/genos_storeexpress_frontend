import React, { createContext, ReactNode } from "react";
import {CartsApi} from "services/api";
import {Cart} from "models/cart";


interface CartContextProps {

    addToCart(itemId: number): Promise<void>;
    removeFromCart(id: number): Promise<void>;

    incrementItemQuantity(id: number): Promise<void>;
    decrementItemQuantity(id: number): Promise<void>;

    getCart(): Promise<Cart>;

}

export const CartContext = createContext<CartContextProps | undefined>(undefined)


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const addToCart = async (itemId: number): Promise<void> => {
        return await CartsApi.addToCart(itemId);
    }

    const removeFromCart = async (itemId: number): Promise<void> => {
        return await CartsApi.removeFromCart(itemId);
    }

    const incrementItemQuantity = async (itemId: number): Promise<void> => {
        return await CartsApi.incrementItemQuantity(itemId);
    }

    const decrementItemQuantity = async (itemId: number): Promise<void> => {
        return await CartsApi.decrementItemQuantity(itemId);
    }

    const getCart = async (): Promise<Cart> => {
        return await CartsApi.getCart();
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