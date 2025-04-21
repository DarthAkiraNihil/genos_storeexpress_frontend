import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import React from 'react';

interface ItemReviewProps {
    rating: number;
    comment: string;
    author: string;
}

export const ItemReview: React.FC<ItemReviewProps> = ( { rating, comment, author }) => {
    return (
        <Card sx={{minWidth: '100%'}}>
            <CardContent>
                <Typography variant="h6">
                    { author }
                </Typography>
                <Rating value={rating} readOnly sx={{
                    display: 'flex'
                }}/>
                <Typography variant="body2">
                    { comment }
                </Typography>
            </CardContent>
        </Card>
    )
}