
import React, {useContext, useEffect, useState} from 'react';
import { ItemContext } from 'context/ItemContext';
import {Link, useNavigate, useParams} from "react-router-dom";
import { ItemType } from 'models/items/ItemType';
import {Item} from "../models/items";

interface ItemListProps {
    type: ItemType;
}

const ItemsList: React.FC = ( ) => {

    const [items, setItems] = useState<Item[]>([]);

    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext);
    const navigate = useNavigate();

    console.log("Reload");

    useEffect(() => {
        context?.getList(type!).then((response) => {
            setItems(response);
        })
    }, [type]);

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    const handleDelete = (itemType: ItemType, id: number) => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот товар?")
        if (isConfirmed) {
            context.deleteItem(id, itemType);
        }
    }

    
    return (
        <div>
            <h1>Список товаров</h1>
            <button onClick={() => navigate("/items/add")}>Add a new item</button>
            <button onClick={() => navigate("/items/cpu")}>TEST TEST</button>
            <button onClick={() => navigate("/items/display")}>TEST TEST</button>
            {
                items.map((item) => {
                    console.log(item);
                    return (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <h2>{item.model}</h2>
                            <p>{item.price} руб.</p>
                            <Link to={`/items/${item.id}`}>Подробнее</Link>
                            <button onClick={() => handleDelete(item.item_type, item.id)}>Удалить</button>
                            {/* Удаление проекта */}
                        </div>
                    )
                }
            )}
        </div>
    );
};


// Экспортируем компонент ProjectList по умолчанию
export default ItemsList;
