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
import {BankCardsPage, OrderDetailsPage, OrderListPage, PaymentPage} from "pages/order";
import React from "react";
import {
    BankCardProvider,
    CartProvider,
    DiscountProvider,
    ItemProvider,
    LegalEntityProvider,
    OrderProvider,
    ReportProvider
} from "context";
import { SignUpPage } from "pages/auth";
import {DiscountManagementPage, LegalEntityManagementPage, SalesReportPage} from "../pages/admin";

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
                path: '/sign_up',
                element: <SignUpPage />
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
                            <ReportProvider>
                                <OrderListPage />
                            </ReportProvider>
                        </OrderProvider>
                    </ProtectedRoute>
            },
            {
                path: '/order/:id',
                element:
                    <ProtectedRoute allowCustomers>
                        <OrderProvider>
                            <ItemProvider>
                                <ReportProvider>
                                    <OrderDetailsPage />
                                </ReportProvider>
                            </ItemProvider>
                        </OrderProvider>
                    </ProtectedRoute>
            },
            {
                path: '/order/:id/payment',
                element:
                    <ProtectedRoute allowCustomers>
                        <OrderProvider>
                            <BankCardProvider>
                                <PaymentPage />
                            </BankCardProvider>
                        </OrderProvider>
                    </ProtectedRoute>
            },
            {
                path: '/cards',
                element:
                    <ProtectedRoute allowCustomers>
                        <BankCardProvider>
                            <BankCardsPage />
                        </BankCardProvider>
                    </ProtectedRoute>
            },
            {
                path: '/legal_entities',
                element:
                    <ProtectedRoute allowAdmin>
                        <LegalEntityProvider>
                            <LegalEntityManagementPage />
                        </LegalEntityProvider>
                    </ProtectedRoute>
            },
            {
                path: '/sales_report',
                element:
                    <ProtectedRoute allowAdmin>
                        <ReportProvider>
                            <SalesReportPage />
                        </ReportProvider>
                    </ProtectedRoute>
            },
            {
                path: '/discounts',
                element:
                    <ProtectedRoute allowAdmin>
                        <DiscountProvider>
                            <ItemProvider>
                                <DiscountManagementPage />
                            </ItemProvider>
                        </DiscountProvider>
                    </ProtectedRoute>
            },
        ],
    },
])

export default GenosStorExpressRouter;
