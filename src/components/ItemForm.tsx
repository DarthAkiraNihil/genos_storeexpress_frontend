import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ItemType } from "../models/items/ItemType";
import { ItemContext } from "../context/ItemContext";


interface NewItem {
    name: string;
    model: string;
    price: number;
    description: string;
    item_type: ItemType;
    characteristics: string;
};


const ItemForm: React.FC = () => {

    const context = useContext(ItemContext)
    const navigate = useNavigate()


    const [newItem, setNewItem] = useState<NewItem>({
        name: "",
        model: "",
        price: 0.0,
        description: "",
        item_type: ItemType.ComputerCase,
        characteristics: "",
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()


        if (!newItem.name.trim() || !newItem.model.trim() || !newItem.description.trim() || newItem.price === 0.0) {
            alert("Обязательные для всех товаров поля не заполнены");
            return;
        }


        if (context) {

            context.createItem({
                ...newItem,
                characteristics: JSON.parse(newItem.characteristics),
                overall_rating: 0,
                id: 0
            });


            setNewItem({
                name: "",
                model: "",
                price: 0.0,
                description: "",
                item_type: ItemType.ComputerCase,
                characteristics: "",
            })

            navigate("/")
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Добавление нового товара</h2>
            <div>
                <input
                    type="text"
                    placeholder="Название"
                    value={newItem.name}
                    required
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Модель"
                    value={newItem.model}
                    required
                    onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="numer"
                    placeholder="Цена"
                    value={newItem.price}
                    required
                    onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value || "", 10) })}
                />
            </div>
            <div>
                <textarea
                    placeholder="Описание"
                    value={newItem.description}
                    required
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
            </div>
            <div>
                <select title="item_type" onChange={(e) => setNewItem({...newItem, item_type: ItemType.ComputerCase})}>
                    {
                        Object.keys(ItemType).map((val) => (
                            <option value={val}>{val}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <textarea
                    placeholder="Характеристики"
                    value={newItem.characteristics}
                    required
                    onChange={(e) => setNewItem({ ...newItem, characteristics: e.target.value })}
                />
            </div>
            <button type="submit">Добавить товар</button>
            <button type="button" onClick={() => navigate("/")}>
                На главную
            </button>
        </form>
    )
    }


export default ItemForm
