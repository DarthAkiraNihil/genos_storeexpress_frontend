import { ItemDetails } from "components/items/details/ItemDetails";
import {ItemCatalogue} from "components/items/ItemCatalogue";
import { ItemList } from "components/items/ItemList";
import GenosStorExpressLayout from "../components";
import { ProtectedRoute } from "./ProtectedRoute";
import {createBrowserRouter} from "react-router";
import { ItemForm } from "components/items";
import MainPage from "components/MainPage";
import {Authorization} from "../components/auth/Authorization";

const GenosStorExpressRouter = createBrowserRouter([
    {
        path: '/',
        Component: GenosStorExpressLayout,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/sign_in',
                element: <Authorization />
            },
            {
                path: '/items',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemCatalogue />
                    </ProtectedRoute>,
            },
            {
                path: '/items/:type/',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemList />
                    </ProtectedRoute>
            },
            {
                path: '/items/:type/:id',
                element:
                    <ProtectedRoute allowCustomers>
                        <ItemDetails />
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
