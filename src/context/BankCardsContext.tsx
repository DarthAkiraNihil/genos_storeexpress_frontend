import React, { createContext, ReactNode } from "react";
import {BankCardsApi} from "services/api";
import {PaginatedList} from "../models";
import {BankCard} from "../models/orders/BankCard";


interface BankCardsContextProps {

    addBankCard(card: BankCard, token: string): Promise<void>
    getList(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>>;
    updateCard(cardId: number, updated: BankCard, token: string): Promise<void>;
    deleteCard(cardId: number, token: string): Promise<void>;

}

export const BankCardsContext = createContext<BankCardsContextProps | undefined>(undefined)


export const BankCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const addBankCard = async (card: BankCard, token: string): Promise<void> => {
        return await BankCardsApi.addBankCard(card, token);
    }
    const getList = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<BankCard>> => {
        return await BankCardsApi.getList(token, pageNumber, pageSize);
    }
    const updateCard = async (cardId: number, updated: BankCard, token: string): Promise<void> => {
        return await BankCardsApi.updateCard(cardId, updated, token);
    }
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