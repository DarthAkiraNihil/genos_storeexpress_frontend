import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React from "react";

interface ItemDetailsCardProps {
    imageUrl: string;
    name: string;
    model: string;
    price: number;
    inCart: boolean;
    handleRemoveFromCart: () => void;
    handleAddToCart: () => void;
}

export const ItemDetailsCard: React.FC<ItemDetailsCardProps>  = ( { imageUrl, name, model, price, inCart, handleRemoveFromCart, handleAddToCart} ) => {
    return (
        <Card sx={{ display: 'flex', padding: '32px' }}>
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

                    <Typography variant="h4" component="div">
                        { name }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        { model }
                    </Typography>

                    <Typography variant="h4">
                        { price } руб.
                    </Typography>

                </CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {
                        inCart ? (
                            <Button variant="contained" color="primary" onClick={handleRemoveFromCart} size={"large"}>
                                В корзине
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAddToCart} size={"large"}>
                                В корзину
                            </Button>
                        )
                    }
                </Box>
            </Box>

        </Card>
    )
}