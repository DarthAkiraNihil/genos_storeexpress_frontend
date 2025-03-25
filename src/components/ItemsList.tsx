// Импортируем необходимые хуки из React
import { useState, useEffect } from 'react';

// Определяем интерфейс для типа Project, который описывает структуру данных проекта
interface Item {
    id: number;
    name: string;
    model: string;
    description: string;
    price: number;
    itemType : string;
}


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
        // Выполняем запрос к API
        fetch("/api/items/computer_case")
            // Преобразуем ответ в JSON
            .then((response) => {
                var j = response.json();
                console.log(j);
                return j;}
            )
            // Обрабатываем успешный ответ
            .then((data: Item[]) => {
                console.log(data)
                setItems(data); // Сохраняем полученные данные в состояние projects
                setLoading(false); // Устанавливаем состояние загрузки в false
            })
            // Обрабатываем ошибку, если она возникла
            .catch((error) => {
                console.log(error.message)
                setError(error.message); // Сохраняем сообщение об ошибке в состояние error
                setLoading(false); // Устанавливаем состояние загрузки в false
            });
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
            <ul>
                {/* Проходим по массиву projects и отображаем каждый проект */}
                {items.map((project) => (
                    <li key={project.id}> {/* Указываем ключ для каждого элемента списка */}
                        <h2>{project.name}</h2> {/* Отображаем название проекта */}
                        <p>{project.model}</p> {/* Отображаем описание проекта */}
                        <p>{project.description}</p> {/* Отображаем описание проекта */}
                        <p>{project.price}</p> {/* Отображаем описание проекта */}
                        <p>{project.itemType}</p> {/* Отображаем описание проекта */}
                    </li>
                ))}
            </ul>
        </div>
    );
};


// Экспортируем компонент ProjectList по умолчанию
export default ItemsList;
