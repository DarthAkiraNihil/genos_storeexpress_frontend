import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import 'styles/items/ItemListCard.css'
import {Discount} from "../../models/orders";
import Grid from "@mui/material/Grid";
import {Edit} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ConfirmDialog} from "../common";


interface ItemListCardProps {
    id: number,
    name: string;
    model: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
    discount: Discount | null;
    onConfirmDelete: (id: number) => Promise<void>;
    isAdministrator: boolean;
}


export const ItemListCard: React.FC<ItemListCardProps> = ( { id, name, model, price, imageUrl, rating, reviewsCount, discount, onConfirmDelete, isAdministrator })=> {

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = React.useState(false);

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

                    {
                        discount ? (
                            <>
                                <Typography variant="h5" sx={{textDecoration: 'line-through'}}>
                                    { price }
                                </Typography>
                                <Typography variant="h5">
                                    { price * (1 - discount.value )} руб.
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h5">
                                { price } руб.
                            </Typography>
                        )
                    }

                </CardContent>
                <Grid container spacing={2}>
                    {!isAdministrator ? (
                        <Grid size={4}>
                            <Link to={`${id}`}>
                                <Button variant="contained" fullWidth color="primary">
                                    Подробнее
                                </Button>
                            </Link>
                        </Grid>
                    ) : (
                        <>
                            <Grid size={4}>
                                <Link to={`${id}/edit`}>
                                    <Button variant="contained" color="primary" fullWidth startIcon={<Edit />}>
                                        Редактировать
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid size={4}>
                                <Button variant="outlined" color="error" fullWidth startIcon={<DeleteIcon />} onClick={() => {
                                    setIsDeleteConfirmModalOpen(true)}
                                }>
                                    Удалить
                                </Button>
                            </Grid>
                        </>
                        )
                    }
                </Grid>
                <ConfirmDialog
                    open={isDeleteConfirmModalOpen}
                    onConfirm={() => {
                        onConfirmDelete(id).then(() => setIsDeleteConfirmModalOpen(false));
                    }}
                    onClose={() => {
                        setIsDeleteConfirmModalOpen(false);
                    }}
                    title={"Подтверждение удаления товара"}
                    confirmText={`Вы уверены, что хотите удалить ${name}?`}
                    />
            </Box>

        </Card>
    );
}