import React, { createContext, useState, useEffect, ReactNode } from "react";
import { DetailedItem } from "../models/items/DetailedItem";
import ItemsApi from "../services/api/ItemsApiService";
import { ItemType } from "../models/items/ItemType";
import { Item } from "../models/items/Item";

interface ItemContextProps {
    items: Item[];
    getDetailedItem(id: number, type: ItemType): Promise<DetailedItem>;
    getImageUrl(id: number): string;

    createItem(itemData: DetailedItem): void;
    updateItem(id: number, itemData: DetailedItem): void;
    deleteItem(id: number, itemType: ItemType): void;
}


export const ItemContext = createContext<ItemContextProps | undefined>(undefined)


export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);


    useEffect(() => {
        fetchProjects();
    }, [])


    const fetchProjects = async () => {
        const data = await ItemsApi.getList(ItemType.ComputerCase);
        setItems(data || []);
    }

    const getDetailedItem = async (id: number, type: ItemType) => {   
        const details = await ItemsApi.getDetails(type, id);
        return details;
    }

    const getImageUrl = (id: number) => {
        return ItemsApi.getImageUrl(id);
    }

    const createItem = async (itemData: DetailedItem) => {
        ItemsApi.createItem(itemData).then(
            (item) => {
                setItems([...items, item])
            }
        )
        .catch((e) => {
            alert(e);
        })
    }

    const updateItem = async (id: number, itemData: DetailedItem) => {
        ItemsApi.updateItem(id, itemData).then(
            (response) => {
                setItems((previous) => previous.map(
                    (item) => (item.id === id ? { ...item, ...response }: item)
                ))
            }
        )

    }

    const deleteItem = async (id: number, itemType: ItemType) => {
        ItemsApi.deleteItem(itemType, id).then(
            () => {
                setItems(items.filter((item) => item.id !== id));
            }
        )
    }

    return (
        <ItemContext.Provider value={{ items, getDetailedItem, getImageUrl, createItem, updateItem, deleteItem }}>{children}</ItemContext.Provider>
    );
}