import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Discount } from 'models/orders';


interface CartItemCardProps {
    name: string;
    model: string;
    price: number;
    quantity: number;
    discount: Discount | null;

    imageUrl: string;

    onIncrement: () => void;
    onDecrement: () => void;
}


export const CartItemCard: React.FC<CartItemCardProps> = ({
        name, model, price, quantity, imageUrl, onIncrement, onDecrement, discount
    })=> {

    const _price = discount ? (1 - discount.value) * price : price;

    return (
        <Card sx={{ display: 'flex', padding: '20px' }}>

            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                sx={{
                    width:'200px',
                    height:'200px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography variant="h5" component="div">
                        { name }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        { model }
                    </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6">
                            Цена единицы:
                        </Typography>
                        {
                            discount ? (
                                <>
                                    <Typography variant="h5" sx={{textDecoration: 'line-through'}}>
                                        { price }
                                    </Typography>
                                    <Typography variant="h5">
                                        { _price } руб.
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h6">
                                    { _price } руб.
                                </Typography>
                            )
                        }


                        <Typography variant="h6">
                            Количество: { quantity } шт.
                        </Typography>

                        <Typography variant="h6">
                            Итоговая цена: { _price * quantity } руб.
                        </Typography>

                        <Button variant="contained" color="primary" onClick={onDecrement}>
                            -
                        </Button>

                        <Button variant="contained" color="primary" onClick={onIncrement}>
                            +
                        </Button>
                    </Box>

                </CardContent>
            </Box>

        </Card>
    );
}