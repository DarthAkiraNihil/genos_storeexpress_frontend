import React, { createContext, ReactNode } from "react";
import {LegalEntityApi} from 'services/api';
import {PaginatedList} from "../models";
import {LegalEntity} from "../models/user";


interface LegalEntityContextProps {

    verify(legalEntityId: string, token: string): Promise<void>
    revoke(legalEntityId: string, token: string): Promise<void>
    getVerified(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>>
    getAwaiting(token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>>

}

export const LegalEntityContext = createContext<LegalEntityContextProps | undefined>(undefined)


export const LegalEntityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const verify = async (legalEntityId: string, token: string): Promise<void> => {
        return await LegalEntityApi.verify(legalEntityId, token);
    }
    const revoke = async (legalEntityId: string, token: string): Promise<void> => {
        return await LegalEntityApi.revoke(legalEntityId, token);
    }
    const getVerified = async (token: string, pageNumber: number, pageSize: number): Promise<PaginatedList<LegalEntity>> => {
        return await LegalEntityApi.getVerified(token, pageNumber, pageSize);
    }
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

