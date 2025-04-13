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
import React from "react";

const GenosStorExpressRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: <p>
            I'm ded
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
                        <ItemListPage />
                    </ProtectedRoute>
            },
            {
                path: '/items/:type/:id',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemDetailsPage />
                    </ProtectedRoute>
            },
            {
                path: '/cart',
                element:
                    <ProtectedRoute allowCustomers>
                        <CartPage />
                    </ProtectedRoute>
            },
            {
                path: '/items/add',
                element:
                    <ProtectedRoute allowAdmin>
                        <ItemForm />
                    </ProtectedRoute>
            },
        ],
    },
])

export default GenosStorExpressRouter;
