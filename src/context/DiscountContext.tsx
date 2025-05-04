import React, { createContext, ReactNode } from "react";
import {DiscountApi} from "services/api";
import {Discount} from "../models/orders";


/**
 * Пропсы контекста скидок
 */
interface DiscountContextProps {

    /**
     * Метод активации скидки
     * @param itemId Номер товара
     * @param discountData Данные скидки
     * @param token Авторизационный токен
     */
    activate(itemId: number, discountData: Discount, token: string): Promise<void>;

    /**
     * Метод обновления скидки
     * @param discountId Номер скидки
     * @param discountData Обновлённые данные скидки
     * @param token Авторизационный токен
     */
    edit(discountId: number, discountData: Discount, token: string): Promise<void>;

    /**
     * Деактивация скидки
     * @param discountId Номер скидки
     * @param token Авторизационный токен
     */
    deactivate(discountId: number, token: string): Promise<void>;

}

export const DiscountContext = createContext<DiscountContextProps | undefined>(undefined)


export const DiscountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Метод активации скидки
     * @param itemId Номер товара
     * @param discountData Данные скидки
     * @param token Авторизационный токен
     */
    const activate = async (itemId: number, discountData: Discount, token: string): Promise<void> => {
        return await DiscountApi.activate(itemId, discountData, token);
    }

    /**
     * Метод обновления скидки
     * @param discountId Номер скидки
     * @param discountData Обновлённые данные скидки
     * @param token Авторизационный токен
     */
    const edit = async (discountId: number, discountData: Discount, token: string): Promise<void> => {
        return await DiscountApi.edit(discountId, discountData, token);
    }

    /**
     * Деактивация скидки
     * @param discountId Номер скидки
     * @param token Авторизационный токен
     */
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