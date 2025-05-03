import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AuthProvider, CartProvider, ItemProvider, OrderProvider} from "context";
import {MemoryRouter, Route, Routes} from "react-router";
import React, {act} from "react";
import {CartsApi, ItemsApi} from "services/api";
import {DetailedItem, ItemType} from "models/items";
import {CartPage} from "../../pages/cart";

const testItem: DetailedItem = {
    id: 1,
    name: "TEST ITEM",
    model: "TEST ITEM",
    description: "TEST ITEM",
    price: 100.0,
    item_type : ItemType.ComputerCase,
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

beforeEach(() => {
    const mockIncrementItemQuantity = jest.spyOn(CartsApi, 'incrementItemQuantity');
    mockIncrementItemQuantity.mockImplementation(async () => {});

    const mockDecrementItemQuantity = jest.spyOn(CartsApi, 'decrementItemQuantity');
    mockDecrementItemQuantity.mockImplementation(async () => {});

    const mockGetReviews = jest.spyOn(ItemsApi, 'getReviews');
    mockGetReviews.mockImplementation(async () => {
        return {
            count: 0,
            previous: null,
            next: null,
            items: []
        }
    });
})

describe('<CartPage /> - Тестирование страницы корзины', () => {
    test("Корзина не пуста. Список содержит корректную информацию", async () => {

        const mockGetCart = jest.spyOn(CartsApi, 'getCart');
        mockGetCart.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [
                    {
                        quantity: 2,
                        item: testItem,
                    }
                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <CartProvider>
                                        <ItemProvider>
                                            <CartPage />
                                        </ItemProvider>
                                    </CartProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("cart_page")).toBeDefined();

        expect(screen.getByLabelText("create_order")).toBeDefined();
        expect(screen.getByLabelText("create_order")).toBeEnabled();

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 200 руб");

        expect(screen.getAllByLabelText("cart_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("quantity").innerHTML).toContain("2 шт.");
        expect(screen.getByLabelText("total_price").innerHTML).toContain("200 руб.");

    })

    test("Корзина не пуста. Список содержит корректную информацию. Товар со скидкой", async () => {

        const mockGetCart = jest.spyOn(CartsApi, 'getCart');
        mockGetCart.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [
                    {
                        quantity: 2,
                        item: {
                            ...testItem,
                            active_discount: {
                                id: 1,
                                value: 0.3,
                                ends_at: new Date()
                            }
                        },
                    }
                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <CartProvider>
                                        <ItemProvider>
                                            <CartPage />
                                        </ItemProvider>
                                    </CartProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("cart_page")).toBeDefined();

        expect(screen.getByLabelText("create_order")).toBeDefined();
        expect(screen.getByLabelText("create_order")).toBeEnabled();

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 140 руб");

        expect(screen.getAllByLabelText("cart_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("new_item_price").innerHTML).toContain("70 руб.");
        expect(screen.getByLabelText("quantity").innerHTML).toContain("2 шт.");
        expect(screen.getByLabelText("total_price").innerHTML).toContain("140 руб.");

    })

    test("Корзина пуста. Выводит соответствующее сообщение", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [

                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <CartProvider>
                                        <ItemProvider>
                                            <CartPage />
                                        </ItemProvider>
                                    </CartProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        const cartIsEmpty = screen.getByLabelText("cart_is_empty")
        expect(cartIsEmpty).toBeDefined();
        expect(cartIsEmpty.innerHTML).toContain("Корзина пуста");

    })

    test("Корзина не выводится. Не контекста заказов", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [

                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <CartProvider>
                                    <ItemProvider>
                                        <CartPage />
                                    </ItemProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        const noContext = screen.getByLabelText("no_context")
        expect(noContext).toBeDefined();
        expect(noContext.innerHTML).toContain("No context is available!");

    })

    test("Корзина не выводится. Не контекста корзин", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [

                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <ItemProvider>
                                        <CartPage />
                                    </ItemProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        const noContext = screen.getByLabelText("no_context")
        expect(noContext).toBeDefined();
        expect(noContext.innerHTML).toContain("No context is available!");

    })

    test("Корзина не выводится. Не контекста товаров", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [

                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <CartProvider>
                                    <OrderProvider>
                                        <CartPage />
                                    </OrderProvider>
                                </CartProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        const noContext = screen.getByLabelText("no_context")
        expect(noContext).toBeDefined();
        expect(noContext.innerHTML).toContain("No context is available!");

    })

    test("Корзина не выводится. Не всех контекстов", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
            return {
                count: 1,
                previous: null,
                next: null,
                items: [

                ]
            };
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/cart"]}>

                    <Routes>
                        <Route path="/cart" element={
                            <AuthProvider>
                                <CartPage />
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        const noContext = screen.getByLabelText("no_context")
        expect(noContext).toBeDefined();
        expect(noContext.innerHTML).toContain("No context is available!");

    })

});
