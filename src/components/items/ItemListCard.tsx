import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import {ItemType} from "../../models/items";

import 'styles/items/ItemListCard.css'


interface ItemListCardProps {
    id: number,
    name: string;
    model: string;
    price: number;
    imageUrl: string;
}


export const ItemListCard: React.FC<ItemListCardProps> = ( { id, name, model, price, imageUrl })=> {
    return (
        <Card className="itemListCard">

            <CardContent className="cardContent">

                <div className="itemImage cardContentItem">
                    <img src={imageUrl} alt={name}/>
                </div>

                <div className="itemShortDescription cardContentItem">

                    <Typography variant="h5" component="div">
                        { name }
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        { model }
                    </Typography>

                    <Typography variant="h5">
                        { price } руб.
                    </Typography>

                </div>

                <div className="buttonMoreInfo cardContentItem">
                    <Link to={`${id}`}>
                        <Button variant="contained" color="primary">
                            Подробнее
                        </Button>
                    </Link>
                </div>

            </CardContent>

        </Card>
    );
}