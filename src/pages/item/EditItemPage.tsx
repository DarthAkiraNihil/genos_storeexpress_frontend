import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {ItemContext, useAuth} from "context";
import {DetailedItem, ItemType} from "models/items";
import { ItemForm } from 'components/items';

export const EditItemPage: React.FC = () => {

    const { token } = useAuth();

    const { id } = useParams<{ id: string }>();
    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext)

    const [item, setItem] = useState<DetailedItem | null>(null)

    const navigate = useNavigate();

    useEffect(() => {
        context?.getDetails(parseInt(id!, 10), type!).then((response) => {
            setItem(response);
        })
    }, [id, token, type, context]);

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    if (!item) {
        return <div>Item not found</div>
    }

    return (
        <ItemForm item={item} edit={true} type={type}/>
    )

}