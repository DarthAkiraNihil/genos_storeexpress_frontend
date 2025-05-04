import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React from "react";
import {Discount} from "models/orders";

interface ItemDetailsCardProps {
    imageUrl: string;
    name: string;
    model: string;
    price: number;
    description: string;
    inCart: boolean;
    discount: Discount | null;
    handleRemoveFromCart: () => void;
    handleAddToCart: () => void;
}

export const ItemDetailsCard: React.FC<ItemDetailsCardProps>  = ( { imageUrl, name, model, description, price, inCart, handleRemoveFromCart, handleAddToCart, discount} ) => {
    return (
        <Card sx={{ display: 'flex', padding: '32px' }} aria-label={"details_card"}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                sx={{
                    width:'320px',
                    height: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography variant="h4" component="div" aria-label={"item_name"}>
                        { name }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }} aria-label={"item_model"}>
                        { model }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }} aria-label={"item_description"}>
                        { description }
                    </Typography>

                    {
                        discount ? (
                            <>
                                <Typography variant="h5" sx={{textDecoration: 'line-through'}} aria-label={"price_old"}>
                                    { price }
                                </Typography>
                                <Typography variant="h5" aria-label={"price_new"}>
                                    { price * (1 - discount.value )} руб.
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h5" aria-label={"price"}>
                                { price } руб.
                            </Typography>
                        )
                    }

                </CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {
                        inCart ? (
                            <Button variant="contained" color="primary" onClick={handleRemoveFromCart} size={"large"} aria-label={"button_to_cart_from_cart"}>
                                В корзине
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAddToCart} size={"large"} aria-label={"button_to_cart_from_cart"}>
                                В корзину
                            </Button>
                        )
                    }
                </Box>
            </Box>

        </Card>
    )
}