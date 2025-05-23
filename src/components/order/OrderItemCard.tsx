import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


interface OrderItemCardProps {
    name: string;
    model: string;
    quantity: number;
    boughtFor: number;

    imageUrl: string;
}


export const OrderItemCard: React.FC<OrderItemCardProps> = ({
        name, model, quantity, boughtFor, imageUrl
    })=> {
    return (
        <Card sx={{ display: 'flex', padding: '20px' }} aria-label={"order_item_card"}>

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

                    <Typography variant="h5" component="div" aria-label={"item_name"}>
                        { name }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }} aria-label={"item_model"}>
                        { model }
                    </Typography>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6" aria-label={"item_price"}>
                            Цена покупки единицы: { boughtFor } руб.
                        </Typography>

                        <Typography variant="h6" aria-label={"item_quantity"}>
                            Количество: { quantity } шт.
                        </Typography>

                        <Typography variant="h6" aria-label={"total"}>
                            Итоговая цена: { boughtFor * quantity } руб.
                        </Typography>
                    </Box>

                </CardContent>
            </Box>

        </Card>
    );
}