import React, {createContext, ReactNode, useEffect, useState} from "react";
import {DetailedItem, Item, ItemType, Review} from "models/items";
import { ItemsApi } from "services/api";
import {PaginatedList} from "../models";


interface ItemContextProps {
    items: Item[];

    getList(type: ItemType, pageNumber: number, pageSize: number): Promise<PaginatedList<Item>>;
    getDetails(id: number, type: ItemType): Promise<DetailedItem>;
    getImageUrl(id: number): string;

    createItem(itemData: DetailedItem, token: string): Promise<any>;
    updateItem(id: number, itemData: DetailedItem, token: string): void;
    deleteItem(id: number, itemType: ItemType, token: string): void;

    getReviews(id: number): Promise<Review[]>;

}

export const ItemContext = createContext<ItemContextProps | undefined>(undefined)


export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        console.log("Loaded provider");
    }, []);

    const getList =  async (type: ItemType, pageNumber: number, pageSize: number): Promise<PaginatedList<Item>> => {
        return await ItemsApi.getList(type, pageNumber, pageSize);
    }

    const getDetails = async (id: number, type: ItemType): Promise<DetailedItem> => {
        return await ItemsApi.getDetails(type, id);
    }

    const getImageUrl =  (id: number): string => {
        return ItemsApi.getImageUrl(id);
    }

    const createItem = async (itemData: DetailedItem, token: string): Promise<any> => {
        ItemsApi.createItem(itemData, token).then(
            (item) => {
                setItems([...items, item])
            }
        )
        .catch((e) => {
            alert(e);
        })
    }

    const updateItem = async (id: number, itemData: DetailedItem, token: string): Promise<any> => {
        ItemsApi.updateItem(id, itemData, token).then(
            (response) => {
                setItems((previous) => previous.map(
                    (item) => (item.id === id ? { ...item, ...response }: item)
                ))
            }
        )

    }

    const deleteItem = async (id: number, itemType: ItemType, token: string): Promise<any> => {
        ItemsApi.deleteItem(itemType, id, token).then(
            () => {
                setItems(items.filter((item) => item.id !== id));
            }
        )
    }

    const getReviews = async (id: number): Promise<Review[]> => {
        return await ItemsApi.getReviews(id);
    }

    return (
        <ItemContext.Provider value={
            {
                items,
                getList,
                getDetails,
                getImageUrl,
                createItem,
                updateItem,
                deleteItem,
                getReviews,
            }
        }>{children}</ItemContext.Provider>
    );
}