import React, { useEffect, useState, useContext } from "react"
import {Link, useParams} from "react-router-dom"
import { ItemContext } from "../../../context/ItemContext"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import { DetailedItem } from "../../../models/items/DetailedItem"
import { ItemType } from "../../../models/items/ItemType"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import '../../../styles/items/ItemDetails.css'
import {CartContext} from "../../../context";
import {ItemCharacteristics} from "./ItemCharacteristics";

export const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { type } = useParams<{ type: ItemType }>();

    const itemContext = useContext(ItemContext)
    const cartContext = useContext(CartContext)

    const [item, setItem] = useState<DetailedItem | null>(null)
    const [inCart, setInCart] = useState<boolean>(false)

    useEffect(() => {
        itemContext?.getDetails(parseInt(id!, 10), type!).then((response) => {
            setItem(response);
            setInCart(response.is_in_cart);
        })
    }, [id, type, itemContext]);

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
        cartContext.removeFromCart(item.id).then(() => {
            setInCart(false);
        });
    }


    return (
        <Grid container spacing={2} className="itemDetailsRoot">
            <Grid size={12}>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <Grid container spacing={8}>
                        <Grid size={3}>
                            <div className="itemDetailsImage">
                                <img src={itemContext.getImageUrl(item.id)} alt={item.name} />
                            </div>
                        </Grid>
                        <Grid size={7}>
                            <div>

                                <Typography variant="h5" component="div">
                                    { item.name }
                                </Typography>

                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                    { item.model }
                                </Typography>

                                <Typography variant="h5">
                                    { item.price } руб.
                                </Typography>

                            </div>
                        </Grid>
                        <Grid size={2}>
                            <div className="buttonMoreInfo">
                                {
                                    inCart ? (
                                        <Button variant="contained" color="primary" onClick={handleRemoveFromCart}>
                                            В корзине
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleAddToCart}>
                                            В корзину
                                        </Button>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
            <Grid size={12}>
                < ItemCharacteristics itemType={item.item_type} characteristics={item.characteristics} />
            </Grid>
        </Grid>
    )
}
