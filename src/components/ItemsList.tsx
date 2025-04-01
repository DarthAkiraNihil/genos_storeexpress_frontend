
import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import { Link, useNavigate} from "react-router-dom";
import { ItemType } from '../models/items/ItemType';



const ItemsList: React.FC = () => {

    const context = useContext(ItemContext);
    const navigate = useNavigate();

    if (!context) {
        return <div>No context is available!</div>
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

            {
                context.items.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <h2>{item.model}</h2>
                        <p>{item.price} руб.</p>
                        <Link to={`/items/${item.id}`}>Подробнее</Link>
                        <button onClick={() => handleDelete(item.item_type, item.id)}>Удалить</button> {/* Удаление проекта */}
                    </div>
                ))
            }
        </div>
    );
};


// Экспортируем компонент ProjectList по умолчанию
export default ItemsList;
