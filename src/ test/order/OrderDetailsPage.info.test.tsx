import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AuthProvider, CartProvider, ItemProvider, OrderProvider, ReportProvider, useAuth} from "context";
import {MemoryRouter, Route, Routes} from "react-router";
import React, {act} from "react";
import {CartsApi, ItemsApi, OrderApi} from "services/api";
import {DetailedItem, ItemType} from "models/items";
import {Order, OrderStatus} from "../../models/orders";
import {OrderDetailsPage} from "../../pages/order";
import * as Auth from 'context/AuthContext'
import { UserRole } from 'models/auth';

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

const testOrder: Order = {
    id: 1,
    count: 1,
    status: OrderStatus.Created,
    created_at: new Date(),
}
beforeEach(() => {

    localStorage.setItem('user', JSON.stringify(
        {
            user: {
                token: "VOID",
                role: "IndividualEntity",
                username: "amomogus@amogus.net"
            },
            token: "VOID",
            role: "IndividualEntity",
            signUp: async () => {},
            signIn: async () => {},
            signOut: async () => {},
        })
    )

    const mockGetDetails = jest.spyOn(OrderApi, 'getOrderDetails');
    mockGetDetails.mockImplementation(async () => {
        return testOrder
    });

    const mockGetItems = jest.spyOn(OrderApi, 'getOrderItems');
    mockGetItems.mockImplementation(async () => {
        return {
            count: 1,
            previous: null,
            next: null,
            items: [
                {
                    item: testItem,
                    quantity: 2,
                    bought_for: 100.0
                }
            ],
        }
    });

})

describe('<OrderDetailsPage /> - Тестирование страницы заказа. Информация', () => {
    test("Заказ найден. Товары есть", async () => {

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/order/1"]}>

                    <Routes>
                        <Route path="/order/:id" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <ItemProvider>
                                        <ReportProvider>
                                            <OrderDetailsPage />
                                        </ReportProvider>
                                    </ItemProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("order_details_page")).toBeDefined();

        const buttonCancel = screen.getByLabelText("button_cancel")
        expect(buttonCancel).toBeDefined()
        expect(buttonCancel).toBeEnabled()
        expect(buttonCancel.innerHTML).toContain("Отменить");

        const buttonNext = screen.getByLabelText("button_next")
        expect(buttonNext).toBeDefined();
        expect(buttonNext).toBeDisabled();
        expect(buttonNext.innerHTML).toContain("Заказ создан");

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 200 руб");

        expect(screen.getAllByLabelText("order_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("item_quantity").innerHTML).toContain("2 шт.");
        expect(screen.getByLabelText("total").innerHTML).toContain("200 руб.");

    })

    test("Заказ найден. Ожидает оплаты", async () => {

        const mockGetDetails = jest.spyOn(OrderApi, 'getOrderDetails');
        mockGetDetails.mockImplementation(async () => {
            return {...testOrder, status: OrderStatus.AwaitsPayment};
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/order/1"]}>

                    <Routes>
                        <Route path="/order/:id" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <ItemProvider>
                                        <ReportProvider>
                                            <OrderDetailsPage />
                                        </ReportProvider>
                                    </ItemProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("order_details_page")).toBeDefined();

        const buttonCancel = screen.getByLabelText("button_cancel")
        expect(buttonCancel).toBeDefined()
        expect(buttonCancel).toBeEnabled()
        expect(buttonCancel.innerHTML).toContain("Отменить");

        const buttonNext = screen.getByLabelText("button_next")
        expect(buttonNext).toBeDefined();
        expect(buttonNext).toBeEnabled();
        expect(buttonNext.innerHTML).toContain("Ожидает оплаты");

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 200 руб");

        expect(screen.getAllByLabelText("order_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("item_quantity").innerHTML).toContain("2 шт.");
        expect(screen.getByLabelText("total").innerHTML).toContain("200 руб.");

    })


    test("Заказ найден. Отменён", async () => {

        const mockGetDetails = jest.spyOn(OrderApi, 'getOrderDetails');
        mockGetDetails.mockImplementation(async () => {
            return {...testOrder, status: OrderStatus.Cancelled};
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {

            render(
                <MemoryRouter initialEntries={["/order/1"]}>

                    <Routes>
                        <Route path="/order/:id" element={
                            <AuthProvider>
                                <OrderProvider>
                                    <ItemProvider>
                                        <ReportProvider>
                                            <OrderDetailsPage />
                                        </ReportProvider>
                                    </ItemProvider>
                                </OrderProvider>
                            </AuthProvider>
                        } />
                    </Routes>

                </MemoryRouter>
            )

        })

        await new Promise(process.nextTick);

        expect(screen.getByLabelText("order_details_page")).toBeDefined();

        const buttonCancel = screen.getByLabelText("button_cancel")
        expect(buttonCancel).toBeDefined()
        expect(buttonCancel).toBeDisabled()
        expect(buttonCancel.innerHTML).toContain("Отменить");

        const buttonNext = screen.getByLabelText("button_next")
        expect(buttonNext).toBeDefined();
        expect(buttonNext).toBeDisabled();
        expect(buttonNext.innerHTML).toContain("Отменён");

        const grandTotal = screen.getByLabelText("grand_total")
        expect(grandTotal).toBeDefined();
        expect(grandTotal.innerHTML).toContain("Итого: 200 руб");

        expect(screen.getAllByLabelText("order_item_card")).toBeDefined();

        expect(screen.getByLabelText("item_name").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_model").innerHTML).toContain("TEST ITEM");
        expect(screen.getByLabelText("item_price").innerHTML).toContain("100 руб.");
        expect(screen.getByLabelText("item_quantity").innerHTML).toContain("2 шт.");
        expect(screen.getByLabelText("total").innerHTML).toContain("200 руб.");

    })
});
