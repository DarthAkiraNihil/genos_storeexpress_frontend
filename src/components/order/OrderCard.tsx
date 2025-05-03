import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { OrderStatus } from 'models/orders';
import {Link} from "react-router";
import Button from "@mui/material/Button";


interface OrderCardProps {
    id: number;
    createdAt: Date;
    status: OrderStatus;
    total: number;
}


export const OrderCard: React.FC<OrderCardProps> = ({
    id, createdAt, status, total
})=> {
    return (
        <Card sx={{ display: 'flex', padding: '20px' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography variant="h5" component="div">
                        Заказ №{ id }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        Создан: { new Date(createdAt).toDateString() }
                    </Typography>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6">
                            Статус: { status }
                        </Typography>

                        <Typography variant="h6">
                            Итого: { total } руб.
                        </Typography>

                        <Link to={`${id}`}>
                            <Button variant="contained" color="primary" fullWidth>
                                Подробнее
                            </Button>
                        </Link>

                    </Box>

                </CardContent>
            </Box>

        </Card>
    );
}