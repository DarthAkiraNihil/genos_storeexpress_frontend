import React, { createContext, ReactNode } from "react";
import {LegalEntityApi} from 'services/api';
import {PaginatedList} from "../models";
import {LegalEntity} from "../models/user";

/**
 * Пропсы контекста юридических лиц
 */
interface LegalEntityContextProps {

    /**
     * Метод верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    verify(legalEntityId: string, token: string): Promise<void>

    /**
     * Метод отзыва верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    revoke(legalEntityId: string, token: string): Promise<void>

    /**
     * Метод получения списка подтверждённых юридических лиц
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getVerified(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>>

    /**
     * Метод получения списка юр. лиц, ожидающих верификации
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getAwaiting(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>>

}

export const LegalEntityContext = createContext<LegalEntityContextProps | undefined>(undefined)


export const LegalEntityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /**
     * Метод верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    const verify = async (legalEntityId: string, token: string): Promise<void> => {
        return await LegalEntityApi.verify(legalEntityId, token);
    }

    /**
     * Метод отзыва верификации юридического лица
     * @param legalEntityId Идентификатор юридического лица
     * @param token Авторизационный токен
     */
    const revoke = async (legalEntityId: string, token: string): Promise<void> => {
        return await LegalEntityApi.revoke(legalEntityId, token);
    }

    /**
     * Метод получения списка подтверждённых юридических лиц
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getVerified = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> => {
        return await LegalEntityApi.getVerified(token, pageNumber, pageSize);
    }

    /**
     * Метод получения списка юр. лиц, ожидающих верификации
     * @param token Авторизационный токен
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getAwaiting = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> => {
        return await LegalEntityApi.getAwaiting(token, pageNumber, pageSize);
    }

    return (
        <LegalEntityContext.Provider value={{
            verify,
            revoke,
            getVerified,
            getAwaiting,
        }}>
            {children}
        </LegalEntityContext.Provider>
    );
}

