import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Review } from 'models/items'
import Box from "@mui/material/Box";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Button, Card, ListItem, Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {ItemReview} from "./ItemReview";
import {ItemContext} from "../../../context";
import {PaginatedList} from "../../../models";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {ReviewFormModal} from "../ReviewFormModal";


interface ItemReviewsProps {
    itemId: number;
    leftReview: Review | null;
    rating: number;
}

export const ItemReviews: React.FC<ItemReviewsProps> = ( { itemId, leftReview, rating } ) => {

    const [reviews, setReviews] = useState<PaginatedList<Review>>();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const [currentReview, setCurrentReview] = useState<Review | null>(leftReview);

    const context = useContext(ItemContext);

    useEffect(() => {
        context?.getReviews(itemId, 0, 10).then((reviews) => {
            setReviews(reviews);
            setLoading(false);
        });
    }, [context, itemId]);

    if (!context) {
        return (
            <div>
                No context is available.
            </div>
        )
    }

    if (loading) {
        return (
            <Card sx={{
                display: 'flex',
                padding: '20px',
                alignItems: "center",
                justifyContent: 'center'
            }} >
                <CircularProgress />
            </Card>
        )
    }

    if (!reviews) {
        return (
            <Typography variant="h5" component="div">
                У данного товара пока нет отзывов
            </Typography>
        )
    }

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setReviews(undefined);
        context?.getReviews(itemId, page, 10).then((response) => {
            setReviews(response);
        })
    }

    const renderRow = (props: ListChildComponentProps) => {
        const {index, style} = props;

        console.log(reviews);
        console.log(index);

        let review: Review = reviews.items[index];

        console.log(review);

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ItemReview rating={review.rating} comment={review.comment} author={review.author} />
            </ListItem>
        )
    }

    return (
        <Card sx={{ display: 'flex', padding: '20px', alignItems: "center" }} aria-label={"reviews"}>
            <Stack spacing={8} sx={{minWidth: '100%'}}>
                <Box display="flex">
                    <Typography variant="h5" component="div">
                        Оценка товара: {
                            <Rating value={rating} readOnly sx={{
                                display: 'flex'
                            }}/>
                        }
                    </Typography>
                </Box>

                <Box display="flex">

                    {
                        currentReview ? (
                            <Stack spacing={2}>
                                <Typography variant="h5" component="div">
                                    Ваш отзыв:
                                </Typography>
                                <ItemReview rating={currentReview.rating} comment={currentReview.comment} author={currentReview.author} />
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="h5" component="div">
                                    Вы пока не оставили отзыва
                                </Typography>
                                <Button variant="contained" onClick={() => { setIsReviewModalOpen(true) }}>
                                    Оставить отзыв
                                </Button>
                                <ReviewFormModal itemId={itemId} open={isReviewModalOpen} onClose={
                                    (review: Review | null) => {
                                        setIsReviewModalOpen(false)
                                        console.log(review);
                                        if (review) {
                                            setCurrentReview(review);
                                            setReviews({...reviews, items: [review, ...reviews.items]});
                                        }
                                    }
                                } />
                            </>
                        )
                    }
                </Box>

                <Box display="flex" justifyContent="center">
                    <Pagination count={Math.floor(reviews.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                                sx={{justifyContent: "center", alignItems: "center"}} />
                </Box>

                <Box display="flex">

                    {
                        <Box
                            sx={{ bgcolor: 'background.paper', width: '100%' }}
                        >
                            {
                                reviews.count === 0 ? (
                                    <Typography variant="h5" component="div" aria-label={"no_reviews"}>
                                        У данного товара пока нет отзывов
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography variant="h5" component="div" aria-label={"reviews_count"}>
                                            Отзывы (всего: {reviews.count}):
                                        </Typography>
                                        <Stack spacing={8} aria-label={"reviews_stack"}>
                                            {
                                                reviews.items.map((review) => (
                                                    <ItemReview rating={review.rating} comment={review.comment}
                                                                author={review.author}/>
                                                ))
                                            }
                                        </Stack>
                                    </>
                                )
                            }
                        </Box>
                    }

                </Box>

                <Box display="flex" justifyContent="center">
                    <Pagination count={Math.floor(reviews.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                                sx={{justifyContent: "center", alignItems: "center"}} />
                </Box>
            </Stack>
        </Card>
    )
}