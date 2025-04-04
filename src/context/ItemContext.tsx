import React, {createContext, ReactNode, useEffect, useState} from "react";
import {DetailedItem, Item, ItemType} from "models/items";
import ItemsApi from "services/api";


interface ItemContextProps {
    items: Item[];

    getList(type: ItemType): Promise<Item[]>;
    getDetailedItem(id: number, type: ItemType): Promise<DetailedItem>;
    getImageUrl(id: number): Promise<string>;

    createItem(itemData: DetailedItem): Promise<any>;
    updateItem(id: number, itemData: DetailedItem): void;
    deleteItem(id: number, itemType: ItemType): void;

}

export const ItemContext = createContext<ItemContextProps | undefined>(undefined)


export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        console.log("Loaded provider");
    }, []);

    const getList =  async (type: ItemType): Promise<Item[]> => {
        console.log("loading list");
        return await ItemsApi.getList(type);
    }

    const getDetailedItem = async (id: number, type: ItemType): Promise<DetailedItem> => {
        return await ItemsApi.getDetails(type, id);
    }

    const getImageUrl = async (id: number): Promise<string> => {
        return ItemsApi.getImageUrl(id);
    }

    const createItem = async (itemData: DetailedItem): Promise<any> => {
        ItemsApi.createItem(itemData).then(
            (item) => {
                setItems([...items, item])
            }
        )
        .catch((e) => {
            alert(e);
        })
    }

    const updateItem = async (id: number, itemData: DetailedItem): Promise<any> => {
        ItemsApi.updateItem(id, itemData).then(
            (response) => {
                setItems((previous) => previous.map(
                    (item) => (item.id === id ? { ...item, ...response }: item)
                ))
            }
        )

    }

    const deleteItem = async (id: number, itemType: ItemType): Promise<any> => {
        ItemsApi.deleteItem(itemType, id).then(
            () => {
                setItems(items.filter((item) => item.id !== id));
            }
        )
    }

    return (
        <ItemContext.Provider value={
            {
                items,
                getList,
                getDetailedItem,
                getImageUrl,
                createItem,
                updateItem,
                deleteItem
            }
        }>{children}</ItemContext.Provider>
    );
}