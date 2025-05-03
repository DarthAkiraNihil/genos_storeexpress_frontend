import React, {useContext} from 'react';
import {useParams} from "react-router";
import {ItemContext} from "context";
import {ItemType} from "models/items";
import { ItemForm } from 'components/items';

export const AddItemPage: React.FC = () => {


    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext)

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    return (
        <ItemForm backLink={`/items/${type}/`} item={null} edit={false} type={type} />
    )
}