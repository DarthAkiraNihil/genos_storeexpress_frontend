import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ItemContext } from "context/ItemContext"
import ItemCharacteristicsNameMapper from "../../services/ItemCharacteristicsNameMapperService"
import { DetailedItem } from "models/items/DetailedItem"
import { ItemType } from "models/items/ItemType"
import ItemsApi from "../../services/api/ItemsApiService"

interface EditedItem {
    id: number;
    name: string;
    model: string;
    overall_rating: number,
    price: number;
    description: string;
    item_type: ItemType;
    characteristics: string;
};


export const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const context = useContext(ItemContext)
    const navigate = useNavigate()


    const [item, setItem] = useState<DetailedItem | null>(null)

    const [editMode, setEditMode] = useState(false);
    const [formState, setFormState] = useState<EditedItem | null>(null);

    const fetchItem = async () => {
        if (id) {
            console.log("exec");
            try {
                const fetchedItem = await ItemsApi.getDetails(ItemType.ComputerCase, parseInt(id, 10)) // Запрос к API
                setItem(fetchedItem)
                setFormState({
                  ...fetchedItem!,
                  characteristics: JSON.stringify(fetchedItem!.characteristics)
                })
                console.log(formState);
            } catch (error) {
                console.error("Failed to fetch item:", error)
                alert("Something went wrong")
            }
        }
    }

    useEffect(() => {
        fetchItem()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formState && context) {
            try {
                context.updateItem(formState!.id, {
                    ...formState!,
                    characteristics: JSON.parse(formState!.characteristics)
                });
                const updatedItem = await context.getDetailedItem(formState.id, ItemType.ComputerCase);
                setItem(updatedItem);
                setEditMode(false);
            } catch (error) {
                console.error("Failed to update item:", error)
                alert("Something went wrong")
            }
        }
    }


    if (!item) {
        return <div>Item not found!</div>
    }


    return (
        <div>
            {!editMode ? (
                <div>
                    <h2>
                        {item.name}
                    </h2>
                    <>
                        <p>
                            <strong>Модель: {item.model}</strong>
                        </p>
                        <p>
                            <strong>Описание: </strong> {item.description}
                        </p>
                        <p>
                            <strong>Цена: </strong> {item.price}
                        </p>
                        <p>
                            <strong>Характеристики: </strong>
                        </p>
                        {
                            Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(item.item_type, item.characteristics)).map(
                                ([k, v]) => (
                                    <p> {k}: {v}</p>
                                )
                            )
                        }
                        <button onClick={() => navigate("/items")}>Back</button>
                    </>
                    <button onClick={() => setEditMode(true)}>Редактировать</button>{" "}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Редактирование товара</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Название"
                            value={formState?.name}
                            required
                            onChange={(e) => setFormState({ ...formState!, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Модель"
                            value={formState?.model}
                            required
                            onChange={(e) => setFormState({ ...formState!, model: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="numer"
                            placeholder="Цена"
                            value={formState?.price}
                            required
                            onChange={(e) => setFormState({ ...formState!, price: parseInt(e.target.value || "", 10) })}
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Описание"
                            value={formState?.description}
                            required
                            onChange={(e) => setFormState({ ...formState!, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <select title="item_type" onChange={(e) => setFormState({...formState!, item_type: ItemType.ComputerCase})}>
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
                            value={formState?.characteristics}
                            required
                            onChange={(e) => setFormState({ ...formState!, characteristics: e.target.value })}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>
                        Cancel
                    </button>
                </form>
            )}
            
        </div>
    )
    }
