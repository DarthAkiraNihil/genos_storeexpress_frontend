import React, {useContext, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Modal, Stack} from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {Review} from "../../models/items";
import {ItemContext, useAuth} from "../../context";


interface ReviewFormProps {
    itemId: number;
    open: boolean;
    onClose: (review: Review | null) => void;
}

export const ReviewFormModal: React.FC<ReviewFormProps> = ({itemId, open, onClose}) => {

    const { token, user } = useAuth();
    const [currentReview, setCurrentReview] = useState<Review>({rating: 0.0, author: "", comment: ""});
    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);

    const context = useContext(ItemContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            await context?.leaveReview(itemId, currentReview, token!);
        } catch (err) {
            setError("Что-то пошло не так");
        } finally {
            setLoading(false);
            onClose({...currentReview, author: user!.username});
        }
    }

    const internalOnClose = () => {
        onClose(null);
    }

    if (!context) {
        return (
            <div>
                No context is available
            </div>
        );
    }

    return (
        <Modal
            open={open}
            onClose={internalOnClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                    Оставьте отзыв на товар!
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography component="legend">Оценка</Typography>
                        <Rating
                            name="simple-controlled"
                            value={currentReview.rating}
                            onChange={(event, newValue) => {
                                setCurrentReview({...currentReview, rating: newValue!});
                            }}
                        />

                        <TextField
                            label="Комментарий"
                            value={currentReview.comment}
                            onChange={(e) => {
                                setCurrentReview({...currentReview, comment: e.target.value});
                            }}
                            required
                            fullWidth
                        />

                        {error && <Typography color="error">{error}</Typography>}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || currentReview.comment.length === 0}
                            endIcon={loading ? <CircularProgress size={20} /> : null}
                            fullWidth
                        >
                            {loading ? "Отправка отзыва..." : "Отправить отзыв"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}