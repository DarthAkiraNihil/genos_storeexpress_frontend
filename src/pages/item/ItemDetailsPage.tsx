import React, { useEffect, useState, useContext } from "react";
import { DetailedItem, ItemType, Review } from "../../models/items";
import {ItemCharacteristics} from "components/items/details/ItemCharacteristics";
import {ItemDetailsCard} from "components/items/details/ItemDetailsCard";
import { ItemContext } from "context/ItemContext";
import {useParams} from "react-router-dom";
import {ItemReviews} from "../../components/items/details/ItemReviews";
import Grid from '@mui/material/Grid';
import '../../styles/items/ItemDetails.css';
import {CartContext} from "../../context";

export const ItemDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { type } = useParams<{ type: ItemType }>();

    const itemContext = useContext(ItemContext)
    const cartContext = useContext(CartContext)

    const [item, setItem] = useState<DetailedItem | null>(null)
    const [inCart, setInCart] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        itemContext?.getDetails(parseInt(id!, 10), type!).then((response) => {
            setItem(response);
            setInCart(response.is_in_cart);
        })

    }, [id, type, itemContext]);

    useEffect(() => {
        itemContext?.getReviews(parseInt(id!, 10)).then((response) => {
            setReviews(response);
        })
    }, [id, itemContext]);

    if (!itemContext || !cartContext) {
        return <div>No context is available!</div>;
    }

    if (!item || !type || !id) {
        return <div>Item not found!</div>
    }

    const handleAddToCart = () => {
        cartContext.addToCart(item.id).then(() => {
            setInCart(true);
        });
    }

    const handleRemoveFromCart = () => {
        cartContext.removeFromCart(item.id).then((response: any) => {
            console.log(response);
            if (response) {
                setInCart(false);
            }
        });
    }


    return (
        <Grid container spacing={2} className="itemDetailsRoot">
            <Grid size={12}>
                <ItemDetailsCard
                    imageUrl={itemContext.getImageUrl(item.id)}
                    name={item.name}
                    model={item.model}
                    price={item.price}
                    inCart={inCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleAddToCart={handleAddToCart} />
            </Grid>
            <Grid size={6}>
                < ItemCharacteristics itemType={item.item_type} characteristics={item.characteristics} />
            </Grid>
            <Grid size={6}>
                < ItemReviews reviews={reviews} rating={item.overall_rating}/>
            </Grid>
        </Grid>
    )
}
