import React, { createContext, ReactNode } from "react";
import {CartsApi} from "services/api";


interface CartContextProps {

    addToCart(itemId: number): Promise<void>;
    removeFromCart(id: number): Promise<void>;

}

export const CartContext = createContext<CartContextProps | undefined>(undefined)


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const addToCart = async (itemId: number): Promise<void> => {
        return await CartsApi.addToCart(itemId);
    }

    const removeFromCart = async (itemId: number): Promise<void> => {
        return await CartsApi.removeFromCart(itemId);
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
        }}>
        {children}
        </CartContext.Provider>
    );
}