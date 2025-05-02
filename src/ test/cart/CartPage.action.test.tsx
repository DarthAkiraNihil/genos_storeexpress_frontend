import {fireEvent, render, screen} from '@testing-library/react'
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
    test("Корзина не пуста. Увеличиваем количество одного товара на 1", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
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

        const buttonIncrement = screen.getByLabelText("button_increment")
        expect(buttonIncrement).toBeDefined();

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => fireEvent.click(buttonIncrement))

        await new Promise(process.nextTick);

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 300 руб");

        expect(screen.getAllByLabelText("cart_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("quantity").innerHTML).toContain("3 шт.");
        expect(screen.getByLabelText("total_price").innerHTML).toContain("300 руб.");

    })

    test("Корзина не пуста. Уменьшаем количество одного товара на 1", async () => {

        const mockGetDetails = jest.spyOn(CartsApi, 'getCart');
        mockGetDetails.mockImplementation(async () => {
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

        const buttonDecrement = screen.getByLabelText("button_decrement")
        expect(buttonDecrement).toBeDefined();

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => fireEvent.click(buttonDecrement))

        await new Promise(process.nextTick);

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 100 руб");

        expect(screen.getAllByLabelText("cart_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("quantity").innerHTML).toContain("1 шт.");
        expect(screen.getByLabelText("total_price").innerHTML).toContain("100 руб.");

    })

});
