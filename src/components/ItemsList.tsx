
import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import { Link, useNavigate} from "react-router-dom";



const ItemsList: React.FC = () => {

    const context = useContext(ItemContext);
    const navigate = useNavigate();

    if (!context) {
        return <div>No context is available!</div>
    }
    
    return (
        <div>
            <h1>Список товаров</h1>
            <button onClick={() => navigate("items/add")}>Add a new item</button>

            {
                context.items.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <img src={context.getImageUrl(item.id)} width={300} height={300} alt={item.name}/>
                        <h2>{item.model}</h2>
                        <p>{item.price} руб.</p>
                        <Link to={`items/${item.id}`}>Подробнее</Link>
                    </div>
                ))
            }
        </div>
    );
};


// Экспортируем компонент ProjectList по умолчанию
export default ItemsList;
