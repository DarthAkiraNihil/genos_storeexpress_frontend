import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {PaginatedList} from "../../models";
import {useSearchParams} from "react-router";
import {BankCardsContext, useAuth} from "context";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import {BankCard} from "../../models/orders/BankCard";
import {BankCardFormModal, BankCardInfoCard} from "../../components/order";
import {Add, Edit} from "@mui/icons-material";
import Button from "@mui/material/Button";

export const BankCardsPage: React.FC = () => {

    const { token } = useAuth();

    const [cards, setCards] = useState<PaginatedList<BankCard>>();
    const [params] = useSearchParams();

    const [isFormOpen, setIsFormOpen] = useState(false);

    const context = useContext(BankCardsContext);

    useEffect(() => {
        if (params.has('pageNumber')) {
            context?.getList(token!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setCards(response);
            })
        } else {
            context?.getList(token!, 0, 10).then((response) => {
                setCards(response);
            })
        }
    }, [token, params, context]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setCards(undefined);
        context?.getList(token!, page, 10).then((response) => {
            setCards(response);
        })
    }

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!cards) {
        return <h1>
            У вас нет банковских карт
        </h1>
    }

    return (
        <Stack className="list" spacing={8} sx={{marginTop: '32px'}}>
            <Box display="flex" justifyContent="center">
                <Typography variant="h4">
                    У вас всего в наличии { cards.count } банковских карт
                </Typography>
            </Box>

            <Button variant="contained" color="secondary" fullWidth startIcon={<Add />} onClick={() => {
                setIsFormOpen(true);
            }}>
                Создать
            </Button>

            <BankCardFormModal card={undefined} edit={false} open={isFormOpen} onClose={
                () => {
                    setIsFormOpen(false)
                }
            } />

            <Card sx={{ display: 'flex', padding: '20px', justifyContent: "center", alignItems: "center" }} >
                <Stack className="list" spacing={8} >
                    {/*// <Box display="flex" justifyContent="center" alignItems="center">*/}
                        {
                            cards.items.length > 0 ? cards.items.map((item) => {
                                    return (
                                        <div key={item.id} className="card">
                                            < BankCardInfoCard
                                                card={item}
                                            />
                                        </div>
                                    )
                                }
                            ) : (
                                <h3>
                                    Ничего не найдено :(
                                </h3>
                            )
                        }
                    {/*// </Box>*/}

                    <Box display="flex" justifyContent="center">
                        <Pagination count={Math.floor(cards.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                                    sx={{justifyContent: "center", alignItems: "center"}} />
                    </Box>
                </Stack>
            </Card>

        </Stack>
    );
}