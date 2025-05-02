import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AuthProvider, CartProvider, ItemProvider} from "context";
import {MemoryRouter, Route, Routes} from "react-router";
import React, {act} from "react";
import {ItemDetailsPage} from "pages/item";
import {CartsApi, ItemsApi} from "services/api";
import {DetailedItem, ItemType} from "models/items";

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
    const mockAddToCart = jest.spyOn(CartsApi, 'addToCart');
    mockAddToCart.mockImplementation(async () => {});

    const mockRemoveFromCart = jest.spyOn(CartsApi, 'removeFromCart');
    mockRemoveFromCart.mockImplementation(async () => {});

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

describe('<ItemDetailsPage /> - Тестирование детальной страницы товара. Действия', () => {
    test("Товар не в корзине. Добавление", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {...testItem, is_in_cart: false, id: id, item_type: itemType};
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

        const buttonAddToCart = screen.getByLabelText("button_to_cart_from_cart")
        expect(buttonAddToCart).toBeDefined();
        expect(buttonAddToCart.innerHTML).toContain("В корзину");

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => fireEvent.click(buttonAddToCart))

        await new Promise(process.nextTick);

        expect(buttonAddToCart.innerHTML).toContain("В корзине");

    })

    test("Товар в корзине. Удаление", async () => {

        const mockGetDetails = jest.spyOn(ItemsApi, 'getDetails');
        mockGetDetails.mockImplementation(async (itemType: ItemType, id: number) => {
            return {...testItem, is_in_cart: true, id: id, item_type: itemType};
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

        const buttonAddToCart = screen.getByLabelText("button_to_cart_from_cart")
        expect(buttonAddToCart).toBeDefined();
        expect(buttonAddToCart.innerHTML).toContain("В корзине");

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => fireEvent.click(buttonAddToCart))

        await new Promise(process.nextTick);

        expect(buttonAddToCart.innerHTML).toContain("В корзину");

    })

});
