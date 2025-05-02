import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AuthProvider, CartProvider, ItemProvider} from "context";
import {Route, Routes, MemoryRouter } from "react-router";
import React, { act } from "react";
import {ItemDetailsPage} from "pages/item";
import {ItemsApi} from "services/api";
import {ItemType} from "models/items";


describe('<ItemDetailsPage /> - Тестирование детальной страницы товара. Информация', () => {
    test("Товар отображается корректно. Отзывов нет. Скидки нет", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: null,
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
        mockGetReviews.mockImplementation(async () => {
            return {
                count: 0,
                previous: null,
                next: null,
                items: []
            }
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <ItemDetailsPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("details")).toBeDefined()
        expect(screen.getByLabelText("details_card")).toBeDefined()
        expect(screen.getByLabelText("characteristics")).toBeDefined()
        expect(screen.getByLabelText("reviews")).toBeDefined();

        ([
            "Типоразмер",
                "Длина",
                "Ширина",
                "Высота",
                "Поддерживаемые форм-факторы материнских плат",
                "Наличие ARGB подсветки",
                "Количество слотов под диски",
        ]).forEach((char: string) => {
            const key = screen.getByLabelText(`${char}-characteristic-key`);
            expect(key).toBeDefined();
            expect(key.innerHTML).toContain(char);
        })

        expect(screen.getByLabelText("Типоразмер-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Типоразмер-characteristic-value").innerHTML).toContain("MidTower");

        expect(screen.getByLabelText("Длина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Длина-characteristic-value").innerHTML).toContain("447");

        expect(screen.getByLabelText("Ширина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Ширина-characteristic-value").innerHTML).toContain("220");

        expect(screen.getByLabelText("Высота-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Высота-characteristic-value").innerHTML).toContain("510");

        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value").innerHTML).toContain("ATXmini-ATXmicro-ATX");

        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value").innerHTML).toContain("");

        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value").innerHTML).toContain("9");

        expect(screen.getByLabelText("no_reviews")).toBeDefined();
        expect(screen.getByLabelText("no_reviews").innerHTML).toContain("У данного товара пока нет отзывов");

        expect(screen.getByLabelText("price")).toBeDefined();
        expect(screen.getByLabelText("price").innerHTML).toContain("100 руб.");

        expect(screen.getByLabelText("item_name")).toBeDefined();
        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("item_model")).toBeDefined();
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("button_to_cart_from_cart")).toBeDefined();
        expect(screen.getByLabelText("button_to_cart_from_cart").innerHTML).toContain("В корзину");

    })

    test("Товар отображается корректно. Отзывов нет. Скидки нет. Притом в корзине", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: true,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: null,
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
        mockGetReviews.mockImplementation(async () => {
            return {
                count: 0,
                previous: null,
                next: null,
                items: []
            }
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <ItemDetailsPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("details")).toBeDefined()
        expect(screen.getByLabelText("details_card")).toBeDefined()
        expect(screen.getByLabelText("characteristics")).toBeDefined()
        expect(screen.getByLabelText("reviews")).toBeDefined();

        ([
            "Типоразмер",
            "Длина",
            "Ширина",
            "Высота",
            "Поддерживаемые форм-факторы материнских плат",
            "Наличие ARGB подсветки",
            "Количество слотов под диски",
        ]).forEach((char: string) => {
            const key = screen.getByLabelText(`${char}-characteristic-key`);
            expect(key).toBeDefined();
            expect(key.innerHTML).toContain(char);
        })

        expect(screen.getByLabelText("Типоразмер-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Типоразмер-characteristic-value").innerHTML).toContain("MidTower");

        expect(screen.getByLabelText("Длина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Длина-characteristic-value").innerHTML).toContain("447");

        expect(screen.getByLabelText("Ширина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Ширина-characteristic-value").innerHTML).toContain("220");

        expect(screen.getByLabelText("Высота-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Высота-characteristic-value").innerHTML).toContain("510");

        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value").innerHTML).toContain("ATXmini-ATXmicro-ATX");

        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value").innerHTML).toContain("");

        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value").innerHTML).toContain("9");

        expect(screen.getByLabelText("no_reviews")).toBeDefined();
        expect(screen.getByLabelText("no_reviews").innerHTML).toContain("У данного товара пока нет отзывов");

        expect(screen.getByLabelText("price")).toBeDefined();
        expect(screen.getByLabelText("price").innerHTML).toContain("100 руб.");

        expect(screen.getByLabelText("item_name")).toBeDefined();
        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("item_model")).toBeDefined();
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("button_to_cart_from_cart")).toBeDefined();
        expect(screen.getByLabelText("button_to_cart_from_cart").innerHTML).toContain("В корзине");

    })

    test("Товар отображается корректно. Отзывов нет. Скидка есть", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: {
                    id: 1,
                    value: 0.3,
                    ends_at: new Date()
                },
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
        mockGetReviews.mockImplementation(async () => {
            return {
                count: 0,
                previous: null,
                next: null,
                items: []
            }
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <ItemDetailsPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("details")).toBeDefined()
        expect(screen.getByLabelText("details_card")).toBeDefined()
        expect(screen.getByLabelText("characteristics")).toBeDefined()
        expect(screen.getByLabelText("reviews")).toBeDefined();

        ([
            "Типоразмер",
            "Длина",
            "Ширина",
            "Высота",
            "Поддерживаемые форм-факторы материнских плат",
            "Наличие ARGB подсветки",
            "Количество слотов под диски",
        ]).forEach((char: string) => {
            const key = screen.getByLabelText(`${char}-characteristic-key`);
            expect(key).toBeDefined();
            expect(key.innerHTML).toContain(char);
        })

        expect(screen.getByLabelText("Типоразмер-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Типоразмер-characteristic-value").innerHTML).toContain("MidTower");

        expect(screen.getByLabelText("Длина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Длина-characteristic-value").innerHTML).toContain("447");

        expect(screen.getByLabelText("Ширина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Ширина-characteristic-value").innerHTML).toContain("220");

        expect(screen.getByLabelText("Высота-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Высота-characteristic-value").innerHTML).toContain("510");

        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value").innerHTML).toContain("ATXmini-ATXmicro-ATX");

        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value").innerHTML).toContain("");

        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value").innerHTML).toContain("9");

        expect(screen.getByLabelText("no_reviews")).toBeDefined();
        expect(screen.getByLabelText("no_reviews").innerHTML).toContain("У данного товара пока нет отзывов");

        expect(screen.getByLabelText("price_old")).toBeDefined();
        expect(screen.getByLabelText("price_old").innerHTML).toContain("100");

        expect(screen.getByLabelText("price_new")).toBeDefined();
        expect(screen.getByLabelText("price_new").innerHTML).toContain("70 руб.");

        expect(screen.getByLabelText("item_name")).toBeDefined();
        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("item_model")).toBeDefined();
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");

    })

    test("Товар отображается корректно. Отзывы есть. Скидки нет", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: null,
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
        mockGetReviews.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [
                    {
                        id: 1,
                        author: "AUTHOR",
                        comment: "COMMENT",
                        rating: 5,
                    }
                ]
            }
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <ItemDetailsPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("details")).toBeDefined()
        expect(screen.getByLabelText("details_card")).toBeDefined()
        expect(screen.getByLabelText("characteristics")).toBeDefined()
        expect(screen.getByLabelText("reviews")).toBeDefined();

        ([
            "Типоразмер",
            "Длина",
            "Ширина",
            "Высота",
            "Поддерживаемые форм-факторы материнских плат",
            "Наличие ARGB подсветки",
            "Количество слотов под диски",
        ]).forEach((char: string) => {
            const key = screen.getByLabelText(`${char}-characteristic-key`);
            expect(key).toBeDefined();
            expect(key.innerHTML).toContain(char);
        })

        expect(screen.getByLabelText("Типоразмер-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Типоразмер-characteristic-value").innerHTML).toContain("MidTower");

        expect(screen.getByLabelText("Длина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Длина-characteristic-value").innerHTML).toContain("447");

        expect(screen.getByLabelText("Ширина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Ширина-characteristic-value").innerHTML).toContain("220");

        expect(screen.getByLabelText("Высота-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Высота-characteristic-value").innerHTML).toContain("510");

        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value").innerHTML).toContain("ATXmini-ATXmicro-ATX");

        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value").innerHTML).toContain("");

        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value").innerHTML).toContain("9");

        expect(screen.getByLabelText("reviews_count")).toBeDefined();
        expect(screen.getByLabelText("reviews_count").innerHTML).toContain("Отзывы (всего: 1):");

        expect(screen.getByLabelText("reviews_stack")).toBeDefined();

        expect(screen.getByLabelText("review_author_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_author_AUTHOR").innerHTML).toContain("AUTHOR")
        expect(screen.getByLabelText("review_rating_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_comment_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_comment_AUTHOR").innerHTML).toContain("COMMENT")

        expect(screen.getByLabelText("price")).toBeDefined();
        expect(screen.getByLabelText("price").innerHTML).toContain("100 руб.");

        expect(screen.getByLabelText("item_name")).toBeDefined();
        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("item_model")).toBeDefined();
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");

    })

    test("Товар отображается корректно. Отзывы есть. Скидка есть", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: {
                    id: 1,
                    value: 0.3,
                    ends_at: new Date()
                },
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
        mockGetReviews.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [
                    {
                        id: 1,
                        author: "AUTHOR",
                        comment: "COMMENT",
                        rating: 5,
                    }
                ]
            }
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <ItemDetailsPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("details")).toBeDefined()
        expect(screen.getByLabelText("details_card")).toBeDefined()
        expect(screen.getByLabelText("characteristics")).toBeDefined()
        expect(screen.getByLabelText("reviews")).toBeDefined();

        ([
            "Типоразмер",
            "Длина",
            "Ширина",
            "Высота",
            "Поддерживаемые форм-факторы материнских плат",
            "Наличие ARGB подсветки",
            "Количество слотов под диски",
        ]).forEach((char: string) => {
            const key = screen.getByLabelText(`${char}-characteristic-key`);
            expect(key).toBeDefined();
            expect(key.innerHTML).toContain(char);
        })

        expect(screen.getByLabelText("Типоразмер-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Типоразмер-characteristic-value").innerHTML).toContain("MidTower");

        expect(screen.getByLabelText("Длина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Длина-characteristic-value").innerHTML).toContain("447");

        expect(screen.getByLabelText("Ширина-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Ширина-characteristic-value").innerHTML).toContain("220");

        expect(screen.getByLabelText("Высота-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Высота-characteristic-value").innerHTML).toContain("510");

        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Поддерживаемые форм-факторы материнских плат-characteristic-value").innerHTML).toContain("ATXmini-ATXmicro-ATX");

        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Наличие ARGB подсветки-characteristic-value").innerHTML).toContain("");

        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value")).toBeDefined();
        expect(screen.getByLabelText("Количество слотов под диски-characteristic-value").innerHTML).toContain("9");

        expect(screen.getByLabelText("reviews_count")).toBeDefined();
        expect(screen.getByLabelText("reviews_count").innerHTML).toContain("Отзывы (всего: 1):");

        expect(screen.getByLabelText("reviews_stack")).toBeDefined();

        expect(screen.getByLabelText("review_author_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_author_AUTHOR").innerHTML).toContain("AUTHOR")
        expect(screen.getByLabelText("review_rating_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_comment_AUTHOR")).toBeDefined();
        expect(screen.getByLabelText("review_comment_AUTHOR").innerHTML).toContain("COMMENT")

        expect(screen.getByLabelText("price_old")).toBeDefined();
        expect(screen.getByLabelText("price_old").innerHTML).toContain("100");

        expect(screen.getByLabelText("price_new")).toBeDefined();
        expect(screen.getByLabelText("price_new").innerHTML).toContain("70 руб.");

        expect(screen.getByLabelText("item_name")).toBeDefined();
        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");

        expect(screen.getByLabelText("item_model")).toBeDefined();
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");

    })

    test("Товар не отображается. Нет контекста товаров", async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemDetailsPage />
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("no_context")).toBeDefined();
        expect(screen.getByLabelText("no_context").innerHTML).toContain("No context is available!")

    })

    test("Товар не отображается. Нет контекста корзины", async () => {

        const mockItemsApi = jest.spyOn(ItemsApi, 'getDetails');
        mockItemsApi.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: null,
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                <ItemProvider>
                                    <ItemDetailsPage />
                                </ItemProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("no_context")).toBeDefined();
        expect(screen.getByLabelText("no_context").innerHTML).toContain("No context is available!")

    })

    test("Товар не отображается. Нет обоих контекстов", async () => {

        const mockItemsApi = jest.spyOn(ItemsApi, 'getDetails');
        mockItemsApi.mockImplementation(async (itemType: ItemType, id: number) => {
            return {
                id: id,
                name: "TEST ITEM",
                model: "TEST ITEM",
                description: "TEST ITEM",
                price: 100.0,
                item_type : itemType,
                is_in_cart: false,
                left_review: null,
                overall_rating: 5,
                reviews_count: 0,
                active_discount: null,
                characteristics: {
                    "tdp": 0,
                    "vendor": "Ardor",
                    "typesize": "MidTower",
                    "length": 447,
                    "width": 220,
                    "height": 510,
                    "supported_motherboard_form_factors": [
                        "ATX", "mini-ATX", "micro-ATX"
                    ],
                    "has_argb_lighting": true,
                    "drives_slots_count": 9
                }}
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/items/computer_case/1"]}>

                    <Routes>
                        <Route path="/items/:type/:id" element={
                            <AuthProvider>
                                    <ItemDetailsPage />
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("no_context")).toBeDefined();
        expect(screen.getByLabelText("no_context").innerHTML).toContain("No context is available!")

    })

});
