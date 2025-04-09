import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Review } from 'models/items'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {ItemCharacteristicsNameMapper} from "../../../services";
import React from "react";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {ItemReview} from "./ItemReview";


interface ItemReviewsProps {
    reviews: Review[];
    rating: number;
}

export const ItemReviews: React.FC<ItemReviewsProps> = ( { reviews, rating } ) => {

    const renderRow = (props: ListChildComponentProps) => {
        const {index, style} = props;

        console.log(reviews);
        console.log(index);

        let review: Review = reviews[index];

        console.log(review);

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ItemReview rating={review.rating} comment={review.comment} />
            </ListItem>
        )
    }

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h5" component="div">
                Оценка товара: {
                    <Rating value={rating} readOnly sx={{
                        display: 'flex'
                    }}/>
                }
            </Typography>
            {
                reviews.length === 0 ? (
                    <Typography variant="h5" component="div">
                        У данного товара пока нет отзывов
                    </Typography>
                ) : (
                    <Box
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <Typography variant="h5" component="div">
                            Отзывы (всего: {reviews.length}):
                        </Typography>
                        <FixedSizeList
                            height={600}
                            width={'100%'}
                            itemSize={128}
                            itemCount={reviews.length}
                            overscanCount={5}
                        >
                            {
                                renderRow
                            }
                        </FixedSizeList>
                    </Box>
                )

            }
        </Box>
    )
}