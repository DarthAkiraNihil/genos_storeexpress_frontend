import React, { createContext, ReactNode } from "react";
import {DiscountApi} from "services/api";
import {Discount} from "../models/orders";


interface DiscountContextProps {

    activate(itemId: number, discountData: Discount, token: string): Promise<void>;
    edit(discountId: number, discountData: Discount, token: string): Promise<void>;
    deactivate(discountId: number, token: string): Promise<void>;

}

export const DiscountContext = createContext<DiscountContextProps | undefined>(undefined)


export const DiscountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const activate = async (itemId: number, discountData: Discount, token: string): Promise<void> => {
        return await DiscountApi.activate(itemId, discountData, token);
    }
    const edit = async (discountId: number, discountData: Discount, token: string): Promise<void> => {
        return await DiscountApi.edit(discountId, discountData, token);
    }
    const deactivate = async (discountId: number, token: string): Promise<void> => {
        return await DiscountApi.deactivate(discountId, token);
    }

    return (
        <DiscountContext.Provider value={{
            activate,
            edit,
            deactivate
        }}>
            {children}
        </DiscountContext.Provider>
    );
}