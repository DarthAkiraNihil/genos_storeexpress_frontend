import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {ItemContext, useAuth} from "context";
import {DetailedItem, ItemType} from "models/items";
import { ItemForm } from 'components/items';

export const AddItemPage: React.FC = () => {


    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext)

    const navigate = useNavigate();

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    return (
        <ItemForm item={null} edit={false} type={type}/>
    )
}