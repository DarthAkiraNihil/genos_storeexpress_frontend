import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {PaginatedList} from "../../models";
import {useNavigate, useParams} from "react-router";
import {BankCardsContext, OrderContext, useAuth} from "context";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import {BankCard} from "../../models/orders/BankCard";
import Button from "@mui/material/Button";
import {Order, OrderStatus} from 'models/orders';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import CircularProgress from "@mui/material/CircularProgress";


export const PaymentPage: React.FC = () => {

    const navigate = useNavigate();

    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();

    const bankCardsContext  = useContext(BankCardsContext);
    const orderContext = useContext(OrderContext);

    const [order, setOrder] = useState<Order>();
    const [cards, setCards] = useState<PaginatedList<BankCard>>();
    const [selectedCard, setSelectedCard] = useState<BankCard | undefined>();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        orderContext?.getOrderDetails(parseInt(id!, 10), token!).then((response) => {
            setOrder(response);
            setLoading(false);
        });
        bankCardsContext?.getList(token!, 0, 10).then((response) => {
            setCards(response);
        })

    }, [id, orderContext, bankCardsContext, token]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setCards(undefined);
        bankCardsContext?.getList(token!, page, 10).then((response) => {
            setCards(response);
        })
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setSelectedCard(cards?.items.find((it) => it.id === parseInt(event.target.value, 10)));
    };

    if (!orderContext || !bankCardsContext) {
        return <div>No context is available!</div>
    }

    if (!order || order.status !== OrderStatus.AwaitsPayment) {
        return <div>Заказ не найден, либо он уже оплачен</div>;
    }

    if (!cards) {
        return <h1>
            У вас нет банковских карт
        </h1>
    }

    if (loading) {
        return (
            <Stack className="list" spacing={8} sx={{marginTop: '32px'}}>
                <CircularProgress size={20} />
            </Stack>
        )
    }

    return (
        <Stack spacing={8} sx={{marginTop: '32px', marginLeft: '30vw', marginRight: '30vw'}}
               alignItems="center"
               justifyContent="center">
            <Box display="flex" justifyContent="center">
                <Typography variant="h4">
                    Оплата заказа { order!.id }
                </Typography>
            </Box>

            <Select
                value={`${selectedCard?.number}`}
                label="Выберите карту"
                onChange={handleChangeSelect}
                fullWidth
            >
                {
                    cards.items.map((card) => (
                        <MenuItem value={card.id} key={card.id}> { card.number }</MenuItem>
                    ))
                }
            </Select>

            <Box display="flex" justifyContent="center">
                <Pagination count={Math.floor(cards.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                            sx={{justifyContent: "center", alignItems: "center"}} />
            </Box>

            <Card sx={{ display: 'flex', padding: '20px', justifyContent: "center", alignItems: "center" }} >
                <Grid container spacing={4}>

                    <Grid size={6}>
                        <Typography variant="h6">
                            Номер карты:
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            { selectedCard?.number }
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            Срок действия:
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            { selectedCard?.valid_thru_month } / { selectedCard?.valid_thru_year}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            Владелец:
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            { selectedCard?.owner }
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            CVC:
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            { selectedCard?.cvc }
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            Банковская система:
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">
                            { selectedCard?.bank_system }
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Button variant="contained"
                            disabled={!selectedCard}
                            onClick={() => {
                                setLoading(true);
                                orderContext?.payOrder(order!.id, selectedCard!.id, token!).then((response) => {
                                    if (response.status === 204) {
                                        navigate(`/order/${id}`);
                                    }
                                    setLoading(false);
                                }).catch(() => {
                                    setLoading(false);
                                })
                            }}
                            fullWidth
                        >
                            Оплатить
                        </Button>
                    </Grid>


                </Grid>
            </Card>

        </Stack>
    );
}