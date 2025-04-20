import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {ItemContext, OrderContext, useAuth} from 'context'
import {Order, OrderItem, OrderStatus} from 'models/orders';
import 'styles/items/ItemList.css';
import Grid from '@mui/material/Grid';
import {useParams, useSearchParams} from "react-router-dom";
import {OrderItemCard} from 'components/order';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {PaginatedList} from "../../models";

export const OrderDetailsPage: React.FC = ( ) => {

    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();

    const [params] = useSearchParams();

    const [order, setOrder] = useState<Order>();
    const [items, setItems] = useState<PaginatedList<OrderItem>>();

    const orderContext = useContext(OrderContext);
    const itemContext = useContext(ItemContext);

    useEffect(() => {
        orderContext?.getOrderDetails(parseInt(id!, 10), token!).then((response: Order) => {
            setOrder(response);
        })
        if (params.has('pageNumber')) {
            orderContext?.getOrderItems(parseInt(id!, 10), token!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setItems(response);
            })
        } else {
            orderContext?.getOrderItems(parseInt(id!, 10), token!, 0, 10).then((response) => {
                setItems(response);
            })
        }
    }, [id, token, orderContext]);

    const textByStatus = (status: OrderStatus): string => {
        switch (status) {
            case OrderStatus.Created: {
                return "Заказ создан";
            }
            case OrderStatus.Confirmed: {
                return "Подтверждён";
            }
            case OrderStatus.AwaitsPayment: {
                return "Ожидает оплаты"
            }
            case OrderStatus.Paid: {
                return "Оплачен";
            }
            case OrderStatus.Processing: {
                return "Обрабатывается";
            }
            case OrderStatus.Delivering: {
                return "Доставляется";
            }
            case OrderStatus.Received: {
                return "Получен";
            }
            case OrderStatus.Cancelled: {
                return "Отменён";
            }
        }
    }

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setItems(undefined);
        orderContext?.getOrderItems(parseInt(id!, 10), token!, page, 10).then((response) => {
            setItems(response);
        })
    }

    const canNextOrderAction = (status: OrderStatus): boolean => {
        return status === OrderStatus.AwaitsPayment || status === OrderStatus.Delivering;
    }

    if (!orderContext || !itemContext) {
        return <div>
            No context is available!
        </div>
    }

    if (!order || !items) {
        return (
            <h1 className="list">
                Заказ не найден
            </h1>
        )
    }

    return (
        <Stack className="list" spacing={8} >
            <Grid
                container
                direction="row"
                spacing={4}
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                <Grid size="grow">
                    <h1>
                        Заказ №{order.id}
                    </h1>
                </Grid>
                <Grid size={3}>
                    <Button variant="contained"
                        // onClick={handleCreateOrder}
                            disabled={order.status === OrderStatus.Cancelled}
                        // endIcon={creatingOrder ? <CircularProgress size={20} /> : null}
                            fullWidth
                    >
                        Отменить
                    </Button>
                </Grid>
                <Grid size={3}>
                    <Button variant="contained"
                        // onClick={handleCreateOrder}
                            disabled={!canNextOrderAction(order.status)}
                            fullWidth
                    >
                        { textByStatus(order.status) }
                    </Button>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
                {
                    items.items.map((orderItem) => {
                            return (
                                <div key={orderItem.item.id} className="card">
                                    <OrderItemCard
                                        name={orderItem.item.name}
                                        model={orderItem.item.model}
                                        boughtFor={orderItem.bought_for}
                                        quantity={orderItem.quantity}

                                        imageUrl={itemContext.getImageUrl(orderItem.item.id)}
                                    />
                                </div>
                            )
                        }
                    )
                }
            </Box>

            <Box display="flex" justifyContent="center">
                <Pagination count={Math.floor(items.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                            sx={{justifyContent: "center", alignItems: "center"}} />
            </Box>

            <h2>
                Итого: {
                items.items.reduce((sum: number, current: OrderItem) => sum + current.quantity * current.bought_for, 0)
            } руб.
            </h2>

        </Stack>
    );
};
