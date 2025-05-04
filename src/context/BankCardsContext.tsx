import React, { createContext, ReactNode } from "react";
import {BankCardsApi} from "services/api";
import {PaginatedList} from "../models";
import {BankCard} from "../models/orders/BankCard";

/**
 * Пропсы контекста банковских карт
 */
interface BankCardsContextProps {

    /**
     * Метод добавления банковской карты
     * @param card Данные карты
     * @param token Авторизационный токен
     */
    addBankCard(card: BankCard, token: string): Promise<void>
    /**
     * Метод получения списка банковских карт
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getList(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>>;
    /**
     * Метод обновления банковской карты
     * @param cardId Идентификатор банковской карты
     * @param updated Обновлённые данные
     * @param token Авторизационный токен
     */
    updateCard(cardId: number, updated: BankCard, token: string): Promise<void>;
    /**
     * Метод удаление банковской карты
     * @param cardId Идентификатор банковской карты
     * @param token Авторизационный токен
     */
    deleteCard(cardId: number, token: string): Promise<void>;

}

export const BankCardsContext = createContext<BankCardsContextProps | undefined>(undefined)


/**
 * Провайдер методов банковских карт
 * @param children дети
 * @constructor стандартный конструктор
 */
export const BankCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Метод добавления банковской карты
     * @param card Данные карты
     * @param token Авторизационный токен
     */
    const addBankCard = async (card: BankCard, token: string): Promise<void> => {
        return await BankCardsApi.addBankCard(card, token);
    }

    /**
     * Метод получения списка банковских карт
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getList = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>> => {
        return await BankCardsApi.getList(token, pageNumber, pageSize);
    }

    /**
     * Метод обновления банковской карты
     * @param cardId Идентификатор банковской карты
     * @param updated Обновлённые данные
     * @param token Авторизационный токен
     */
    const updateCard = async (cardId: number, updated: BankCard, token: string): Promise<void> => {
        return await BankCardsApi.updateCard(cardId, updated, token);
    }

    /**
     * Метод удаление банковской карты
     * @param cardId Идентификатор банковской карты
     * @param token Авторизационный токен
     */
    const deleteCard = async (cardId: number, token: string): Promise<void> => {
        return await BankCardsApi.deleteCard(cardId, token);
    }

    return (
        <BankCardsContext.Provider value={{
            addBankCard,
            getList,
            updateCard,
            deleteCard
        }}>
            {children}
        </BankCardsContext.Provider>
    );
}