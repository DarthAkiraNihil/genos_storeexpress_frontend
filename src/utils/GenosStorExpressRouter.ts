import {createBrowserRouter} from "react-router";
import GenosStorExpressLayout from "../components";
import { ItemList } from "../components/items/ItemList";
import { ItemDetails } from "../components/items/ItemDetails";
import { ItemForm } from "components/items";
import MainPage from "../components/MainPage";
import {ItemCatalogue} from "../components/items/ItemCatalogue";

const GenosStorExpressRouter = createBrowserRouter([
    {
        path: '/',
        Component: GenosStorExpressLayout,
        children: [
            {
                index: true,
                Component: MainPage,
            },
            {
                path: '/items',
                Component: ItemCatalogue,
            },
            {
                path: '/items/:type/',
                Component: ItemList,
            },
            {
                path: '/items/:id',
                Component: ItemDetails,
            },
            {
                path: '/items/add',
                Component: ItemForm,
            },
        ],
    },
])

export default GenosStorExpressRouter;
