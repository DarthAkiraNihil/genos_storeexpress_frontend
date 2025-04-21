import React, {useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import { ItemContext } from 'context/ItemContext'

import 'styles/items/ItemListCard.css'
import {FilterDescription} from "../../models/filter";
import { ItemType } from 'models/items/ItemType';


interface ItemFiltersProps {
    type: ItemType;
}


export const ItemFilters: React.FC<ItemFiltersProps> = ( { type })=> {

    const context = useContext(ItemContext);
    const [filters, setFilters] = React.useState<FilterDescription[]>([]);

    useEffect(() => {
        context?.getFilterData(type).then((response) => { setFilters(response) })
    }, [context]);

    if (!context) {
        return <>No filters available</>
    }

    return (
        <Card sx={{ display: 'flex', padding: '20px' }}>
            
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