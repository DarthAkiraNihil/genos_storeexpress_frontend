import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import 'styles/items/ItemListCard.css'


interface ItemListCardProps {
    id: number,
    name: string;
    model: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
}


export const ItemListCard: React.FC<ItemListCardProps> = ( { id, name, model, price, imageUrl, rating, reviewsCount })=> {
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
                        <Rating value={rating} readOnly sx={{
                            display: 'flex'
                        }}/>
                        <Typography sx={{
                            color: 'text.secondary',
                            mb: 1.5,
                            display: 'flex',
                            paddingLeft: '10px',
                        }}>
                            Отзывов: { reviewsCount }
                        </Typography>
                    </Box>

                    <Typography variant="h5">
                        { price } руб.
                    </Typography>

                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Link to={`${id}`}>
                        <Button variant="contained" color="primary">
                            Подробнее
                        </Button>
                    </Link>
                </Box>
            </Box>

        </Card>
    );
}