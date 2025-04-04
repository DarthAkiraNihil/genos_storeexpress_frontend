import {createBrowserRouter} from "react-router";
import GenosStorExpressLayout from "../components";
import ItemsList from "../components/ItemsList";
import ItemDetails from "../components/ItemDetails";
import ItemForm from "../components/ItemForm";
import MainPage from "../components/MainPage";
import {ItemCatalogueRoot} from "../components/items/ItemCatalogueRoot";

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
                Component: ItemCatalogueRoot,
            },
            {
                path: '/items/:type/',
                Component: ItemsList,
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
