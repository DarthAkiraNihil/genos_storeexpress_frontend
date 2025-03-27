// Импортируем необходимые хуки из React
import { useState, useEffect } from 'react';
import { Item } from '../models/items/Item';
import ItemsApi from "../services/api/ItemsApiService";
import { ItemType } from '../models/items/ItemType';


// Создаем функциональный компонент ProjectList
const ItemsList = () => {
    // Используем хук useState для хранения списка проектов
    const [items, setItems] = useState<Item[]>([]);
    // Используем хук useState для отслеживания состояния загрузки
    const [loading, setLoading] = useState<boolean>(true);
    // Используем хук useState для хранения ошибки, если она возникнет
    const [error, setError] = useState<string | null>(null);


    // Используем хук useEffect для выполнения side-эффектов (загрузка данных при монтировании компонента)
    useEffect(() => {
        getData(); // Вызываем функцию getData для загрузки данных
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании


    // Функция для загрузки данных с API
    const getData = () => {

        ItemsApi.getList(ItemType.ComputerCase)
        .then((data: Item[]) => {
            setItems(data);
        })
        .catch((error) => {
            setError(error);
        })
        .then(() => {
            setLoading(false);
        })

    }


    // Если данные загружаются, отображаем сообщение о загрузке
    if (loading) {
        return <div>Загрузка...</div>;
    }


    // Если произошла ошибка, отображаем сообщение об ошибке
    if (error) {
        return <div>Ошибка: {error}</div>;
    }


    // Если данные успешно загружены, отображаем список проектов
    return (
        <div>
            <h1>Списко товаров</h1>
            <img src={ItemsApi.getImageUrl(1)} alt="Amomogus"></img>
            <ul>
                {/* Проходим по массиву projects и отображаем каждый проект */}
                {items.map((project) => (
                    <li key={project.id}> {/* Указываем ключ для каждого элемента списка */}
                        <h2>{project.name}</h2> {/* Отображаем название проекта */}
                        <p>{project.model}</p> {/* Отображаем описание проекта */}
                        <p>{project.description}</p> {/* Отображаем описание проекта */}
                        <p>{project.price}</p> {/* Отображаем описание проекта */}
                        <p>{project.item_type}</p> {/* Отображаем описание проекта */}
                    </li>
                ))}
            </ul>
        </div>
    );
};


// Экспортируем компонент ProjectList по умолчанию
export default ItemsList;
