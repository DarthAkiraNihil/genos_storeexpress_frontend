import { ItemDetailsPage } from "pages/item/ItemDetailsPage";
import {ItemCataloguePage} from "pages/item/ItemCataloguePage";
import { ItemListPage } from "pages/item/ItemListPage";
import GenosStorExpressLayout from "../components";
import { ProtectedRoute } from "./ProtectedRoute";
import {createBrowserRouter} from "react-router";
import { ItemForm } from "components/items";
import MainPage from "pages/MainPage";
import { CartPage } from "pages/cart/CartPage";
import {SignInPage} from "pages/auth/SignInPage";
import { OrderDetailsPage, OrderListPage } from "pages/order";
import React from "react";
import { CartProvider, ItemProvider, OrderProvider } from "context";

const GenosStorExpressRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: <p>
            Something went wrong
        </p> ,
        Component: GenosStorExpressLayout,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/sign_in',
                element: <SignInPage />
            },
            {
                path: '/items',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemCataloguePage />
                    </ProtectedRoute>,
            },
            {
                path: '/items/:type/',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemProvider>
                            <ItemListPage />
                        </ItemProvider>
                    </ProtectedRoute>
            },
            {
                path: '/items/:type/:id',
                element:
                    <ProtectedRoute allowCustomers>
                        <CartProvider>
                            <ItemProvider>
                                <ItemDetailsPage />
                            </ItemProvider>
                        </CartProvider>
                    </ProtectedRoute>
            },
            {
                path: '/cart',
                element:
                    <ProtectedRoute allowCustomers>
                        <OrderProvider>
                            <CartProvider>
                                <ItemProvider>
                                    <CartPage />
                                </ItemProvider>
                            </CartProvider>
                        </OrderProvider>
                    </ProtectedRoute>
            },
            {
                path: '/items/add',
                element:
                    <ProtectedRoute allowAdmin>
                        <ItemForm />
                    </ProtectedRoute>
            },
            {
                path: '/order',
                element:
                    <ProtectedRoute allowCustomers>
                        <OrderProvider>
                            <OrderListPage />
                        </OrderProvider>
                    </ProtectedRoute>
            },
            {
                path: '/order/:id',
                element:
                    <ProtectedRoute allowCustomers>
                        <OrderProvider>
                            <ItemProvider>
                                <OrderDetailsPage />
                            </ItemProvider>
                        </OrderProvider>
                    </ProtectedRoute>
            },
        ],
    },
])

export default GenosStorExpressRouter;
