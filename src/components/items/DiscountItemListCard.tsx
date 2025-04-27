import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import 'styles/items/ItemListCard.css'
import {Discount} from "../../models/orders";
import {DiscountFormModal} from "../admin";
import {ConfirmDialog} from "../common";
import {DiscountContext, useAuth} from 'context';


interface DiscountItemListCardProps {
    itemId: number,
    name: string;
    model: string;
    imageUrl: string;
    discount: Discount | null;
}


export const DiscountItemListCard: React.FC<DiscountItemListCardProps> = ( { itemId, name, model, imageUrl, discount })=> {

    const { token } = useAuth();

    const context = useContext(DiscountContext);

    const [activateModalOpen, setActivateModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deactivateModalOpen, setDeactivateModalOpen] = React.useState(false);

    if (!context) {
        return (
            <div>
                No context is available
            </div>
        )
    }

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

                    {
                        discount ? (
                            <>
                                <Typography variant="h5">
                                    Назначена скидка {discount.value * 100.0}% до {new Date(discount.ends_at).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h5">
                                Скидка не назначена
                            </Typography>
                        )
                    }

                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button variant="contained" color="primary" disabled={!!discount} onClick={() => setActivateModalOpen(true)}>
                        Добавить и активировать скидку
                    </Button>
                    <Button variant="contained" color="primary" disabled={!discount} onClick={() => setEditModalOpen(true)}>
                        Редактировать скидку
                    </Button>
                    <Button variant="contained" color="primary" disabled={!discount} onClick={() => setDeactivateModalOpen(true)}>
                        Деактивировать скидку
                    </Button>
                    <DiscountFormModal itemId={itemId} discount={discount} open={activateModalOpen} edit={false} onClose={() => {
                        setActivateModalOpen(false);
                    }} />
                    <DiscountFormModal itemId={itemId} discount={discount} open={editModalOpen} edit={true} onClose={() => {
                        setEditModalOpen(false);
                    }} />
                    <ConfirmDialog
                        onConfirm={() => {
                            context?.deactivate(discount!.id, token!)
                            setDeactivateModalOpen(false);
                        }}
                        onClose={() => {
                            setDeactivateModalOpen(false)
                        }}
                        open={deactivateModalOpen}
                        title={"Вы уверены?"}
                        confirmText={`Вы действительно хотите деактивировать эту скидку?`} />
                </Box>
            </Box>

        </Card>
    );
}