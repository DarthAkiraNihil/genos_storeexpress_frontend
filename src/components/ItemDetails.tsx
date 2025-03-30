import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ItemContext } from "../context/ItemContext"
import ItemCharacteristicsNameMapper from "../services/ItemCharacteristicsNameMapperService"
import { DetailedItem } from "../models/items/DetailedItem"
import { ItemType } from "../models/items/ItemType"


const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const context = useContext(ItemContext)
    const navigate = useNavigate()


    const [item, setItem] = useState<DetailedItem | null>(null)


    useEffect(() => {
        if (context) {
            context.getDetailedItem(parseInt(id || "", 10), ItemType.ComputerCase).then((item: DetailedItem) => {
                setItem(item || null);
            });
        }
    }, [context, id])


    if (!item) {
        return <div>Item not found!</div>
    }


    return (
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
                    <strong>Характеристики: </strong>
                </p>
                {
                    Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(item.item_type, item.characteristics)).map(
                        ([k, v]) => (
                            <p> {k}: {v}</p>
                        )
                    )
                }
                <button onClick={() => navigate("/")}>Back</button>
            </>
        </div>
    )
    }

export default ItemDetails;
