import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, MenuItem, Modal, Select, SelectChangeEvent, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {BankCardsContext, useAuth} from "../../context";
import {BankCard} from 'models/orders/BankCard';
import {BankSystem} from "../../models/orders";


interface BankCardFormModalProps {
    card: BankCard | undefined;
    open: boolean;
    onClose: () => void;
    edit: boolean;
}

export const BankCardFormModal: React.FC<BankCardFormModalProps> = ({card, onClose, open, edit}) => {

    const { token, user } = useAuth();
    const [currentCard, setCurrentCard] = useState<BankCard>(
        {number: 0, bank_system: BankSystem.Visa, valid_thru_year: 0, valid_thru_month: 0, cvc: 0, owner: "", id: 0}
    );

    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);

    const context = useContext(BankCardsContext);

    useEffect(() => {
        if (card && edit) {
            setCurrentCard(card);
        }
    }, [card, edit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            if (edit && card) {
                await context?.updateCard(card.id, currentCard, token!);
            } else {
                await context?.addBankCard(currentCard, token!);
            }
        } catch (err) {
            setError("Что-то пошло не так");
        } finally {
            setLoading(false);
            onClose();
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentCard({...currentCard, bank_system: event.target.value as BankSystem});
    };

    const handleOnClose = () => {
        onClose();
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
            onClose={handleOnClose}
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
                    {
                        edit ? 'Редактирование карты' : "Добавление новой карты"
                    }
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>

                        {error && <Typography color="error">{error}</Typography>}

                        <TextField
                            label="Номер карты"
                            value={currentCard.number}
                            onChange={(e) => {
                                setCurrentCard({...currentCard, number: parseInt(e.target.value, 10)});
                            }}
                            type={"number"}
                            required
                            fullWidth
                        />


                        <Typography component="legend">Срок действия</Typography>

                        <TextField
                            label="Месяц"
                            value={currentCard.valid_thru_month}
                            type={"number"}
                            onChange={(e) => {
                                setCurrentCard({...currentCard, valid_thru_month: parseInt(e.target.value, 10)});
                            }}
                            required
                        />

                        <TextField
                            label="Год"
                            value={currentCard.valid_thru_year}
                            type={"number"}
                            onChange={(e) => {
                                setCurrentCard({...currentCard, valid_thru_year: parseInt(e.target.value, 10)});
                            }}
                            required
                        />

                        <TextField
                            label="CVC"
                            type={"number"}
                            value={currentCard.cvc}
                            onChange={(e) => {
                                setCurrentCard({...currentCard, cvc: parseInt(e.target.value, 10)});
                            }}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Владелец"
                            value={currentCard.owner}
                            onChange={(e) => {
                                setCurrentCard({...currentCard, owner: e.target.value});
                            }}
                            required
                            fullWidth
                        />

                        <Select
                            value={currentCard.bank_system}
                            label="Банковская система"
                            onChange={handleChange}
                        >
                            <MenuItem value={BankSystem.Visa}>Visa</MenuItem>
                            <MenuItem value={BankSystem.MasterCard}>MasterCard</MenuItem>
                            <MenuItem value={BankSystem.JBC}>JBC</MenuItem>
                            <MenuItem value={BankSystem.Mir}>Мир</MenuItem>
                        </Select>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} /> : null}
                            fullWidth
                        >
                            {loading ? "Подождите..." : edit ? "Применить изменения" : "Создать"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}