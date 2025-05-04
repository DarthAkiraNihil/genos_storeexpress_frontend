import React, {createContext, ReactNode, useEffect, useState} from "react";
import {DetailedItem, Item, ItemType, Review} from "models/items";
import { ItemsApi } from "services/api";
import {PaginatedList} from "models";
import {FilterDescription, ItemFilter} from 'models/filter';


/**
 * Пропсы контекста товаров
 */
interface ItemContextProps {
    items: Item[];

    /**
     * Метод получения списка товаров
     * @param type Тип товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     * @param filters Фильтры, накладываемые на список
     */
    getList(type: ItemType, pageNumber: number, pageSize: number, filters: ItemFilter | undefined): Promise<PaginatedList<Item>>;

    /**
     * Метод получения детальной информации о товаре
     * @param id Номер товара
     * @param type Тип товара
     */
    getDetails(id: number, type: ItemType): Promise<DetailedItem>;

    /**
     * Метод получения ссылки на изображение товара
     * @param id Номер товара
     */
    getImageUrl(id: number): string;

    /**
     * Метод установки изображения на товар
     * @param id Номер товара
     * @param data Данные об изображении
     * @param token Авторизационный токен
     */
    setImage(id: number, data: FormData, token: string): Promise<void>;

    /**
     * Метод создания товара
     * @param itemData Данные о создаваемом товаре
     * @param token Авторизационный токен
     */
    createItem(itemData: DetailedItem, token: string): Promise<any>;

    /**
     * Метод обновления информации о товаре
     * @param id Номер товара
     * @param itemData Обновлённые данные
     * @param token Авторизационный токен
     */
    updateItem(id: number, itemData: DetailedItem, token: string): Promise<void>;

    /**
     * Удаление товара
     * @param id Номер товара
     * @param itemType Тип товара
     * @param token Авторизационный токен
     */
    deleteItem(id: number, itemType: ItemType, token: string): Promise<void>;

    /**
     * Получение отзывов на товар
     * @param id Номер товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    getReviews(id: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Review>>;

    /**
     * Метод для оставления отзыва на товар
     * @param id Номер товара
     * @param review Данные отзыва
     * @param token Авторизационный токен
     */
    leaveReview(id: number, review: Review, token: string): Promise<any>;

    /**
     * Получение данных о фильтрах на товар
     * @param itemType Тип товара
     */
    getFilterData(itemType: ItemType): Promise<FilterDescription[]>
}

export const ItemContext = createContext<ItemContextProps | undefined>(undefined)


export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        console.log("Loaded provider");
    }, []);

    /**
     * Метод получения списка товаров
     * @param type Тип товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     * @param filters Фильтры, накладываемые на список
     */
    const getList =  async (type: ItemType, pageNumber: number, pageSize: number, filters: ItemFilter | undefined): Promise<PaginatedList<Item>> => {
        return await ItemsApi.getList(type, pageNumber, pageSize, filters);
    }

    /**
     * Метод получения детальной информации о товаре
     * @param id Номер товара
     * @param type Тип товара
     */
    const getDetails = async (id: number, type: ItemType): Promise<DetailedItem> => {
        return await ItemsApi.getDetails(type, id);
    }

    /**
     * Метод получения ссылки на изображение товара
     * @param id Номер товара
     */
    const getImageUrl =  (id: number): string => {
        return ItemsApi.getImageUrl(id);
    }

    /**
     * Метод установки изображения на товар
     * @param id Номер товара
     * @param data Данные об изображении
     * @param token Авторизационный токен
     */
    const setImage = async (id: number, data: FormData, token: string): Promise<void> => {
        return ItemsApi.setImage(id, data, token);
    }

    /**
     * Метод создания товара
     * @param itemData Данные о создаваемом товаре
     * @param token Авторизационный токен
     */
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

    /**
     * Метод обновления информации о товаре
     * @param id Номер товара
     * @param itemData Обновлённые данные
     * @param token Авторизационный токен
     */
    const updateItem = async (id: number, itemData: DetailedItem, token: string): Promise<void> => {
        return await ItemsApi.updateItem(id, itemData, token).then(
            (response) => {
                setItems((previous) => previous.map(
                    (item) => (item.id === id ? { ...item, ...response }: item)
                ))
            }
        )
    }

    /**
     * Удаление товара
     * @param id Номер товара
     * @param itemType Тип товара
     * @param token Авторизационный токен
     */
    const deleteItem = async (id: number, itemType: ItemType, token: string): Promise<any> => {
        return await ItemsApi.deleteItem(itemType, id, token).then(
            () => {
                setItems(items.filter((item) => item.id !== id));
            }
        )
    }

    /**
     * Получение отзывов на товар
     * @param id Номер товара
     * @param pageNumber Номер страницы
     * @param pageSize Размер страницы
     */
    const getReviews = async (id: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Review>> => {
        return await ItemsApi.getReviews(id, pageNumber, pageSize);
    }

    /**
     * Метод для оставления отзыва на товар
     * @param id Номер товара
     * @param review Данные отзыва
     * @param token Авторизационный токен
     */
    const leaveReview = async (id: number, review: Review, token: string): Promise<any> => {
        return await ItemsApi.leaveReview(id, review, token);
    }

    /**
     * Получение данных о фильтрах на товар
     * @param itemType Тип товара
     */
    const getFilterData = async (itemType: ItemType): Promise<FilterDescription[]> => {
        return await ItemsApi.getFilterData(itemType);
    }

    return (
        <ItemContext.Provider value={
            {
                items,
                getList,
                getDetails,
                getImageUrl,
                setImage,
                createItem,
                updateItem,
                deleteItem,
                getReviews,
                leaveReview,
                getFilterData,
            }
        }>{children}</ItemContext.Provider>
    );
}