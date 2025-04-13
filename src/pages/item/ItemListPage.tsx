import React, {useContext, useEffect, useState} from 'react';
import { ItemContext } from 'context/ItemContext';
import { useParams } from "react-router-dom";

import { Item, ItemType } from "../../models/items";
import { ItemListCard } from "components/items/ItemListCard";

import 'styles/items/ItemList.css'

export const ItemListPage: React.FC = ( ) => {

    const [items, setItems] = useState<Item[]>([]);

    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext);

    useEffect(() => {
        context?.getList(type!).then((response) => {
            setItems(response);
        })
    }, [context, type]);

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    return (
        <div className="list">
            <h1>
                Найдено {items.length} товаров типа {type}
            </h1>

            {
                items.map((item) => {
                    console.log(item);
                    return (
                        <div key={item.id} className="card">
                            < ItemListCard
                                id={item.id}
                                name={item.name}
                                model={item.model}
                                price={item.price}
                                imageUrl={context.getImageUrl(item.id)}
                                rating={item.overall_rating}
                                reviewsCount={item.reviews_count}
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
};
