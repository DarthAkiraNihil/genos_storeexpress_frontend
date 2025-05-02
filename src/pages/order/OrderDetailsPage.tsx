import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {ItemContext, OrderContext, ReportContext, useAuth} from 'context'
import {Order, OrderItem, OrderStatus} from 'models/orders';
import 'styles/items/ItemList.css';
import Grid from '@mui/material/Grid';
import {useNavigate, useParams, useSearchParams} from "react-router";
import {OrderItemCard} from 'components/order';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {PaginatedList} from "../../models";
import {UserRole} from "../../models/auth";
import {Add} from "@mui/icons-material";
import {ConfirmDialog} from "../../components/common";

export const OrderDetailsPage: React.FC = ( ) => {

    const navigate = useNavigate();

    const { token, user } = useAuth();
    const { id } = useParams<{ id: string }>();

    const [params] = useSearchParams();

    const [order, setOrder] = useState<Order>();
    const [items, setItems] = useState<PaginatedList<OrderItem>>();
    const [isCancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false);

    const orderContext = useContext(OrderContext);
    const itemContext = useContext(ItemContext);
    const reportContext = useContext(ReportContext);

    useEffect(() => {

        if (!orderContext) {
            return;
        }

        const getDetails = user!.role === UserRole.administrator ? orderContext?.getDetailsOfAnyOrder : orderContext?.getOrderDetails;

        getDetails(parseInt(id!, 10), token!).then((response: Order) => {
            setOrder(response);
        })

        const getItems = user!.role === UserRole.administrator ? orderContext?.getItemsOfAnyOrder : orderContext?.getOrderItems;

        if (params.has('pageNumber')) {
            getItems(parseInt(id!, 10), token!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setItems(response);
            })
        } else {
            getItems(parseInt(id!, 10), token!, 0, 10).then((response) => {
                setItems(response);
            })
        }
    }, [user, params, id, token, orderContext]);

    const textByStatus = (status: OrderStatus): string => {
        if (user!.role === UserRole.administrator) {
            switch (status) {
                case OrderStatus.Created: {
                    return "Подтвердить";
                }
                case OrderStatus.Confirmed: {
                    return "Запросить оплату";
                }
                case OrderStatus.AwaitsPayment: {
                    return "Ожидает оплаты"
                }
                case OrderStatus.Paid: {
                    return "Начать обработку";
                }
                case OrderStatus.Processing: {
                    return "Начать доставку";
                }
                case OrderStatus.Delivering: {
                    return "Ожидает получения";
                }
                case OrderStatus.Received: {
                    return "Получен";
                }
                case OrderStatus.Cancelled: {
                    return "Отменён";
                }
            }
        }
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
                return "Доставляется. Нажмите после получения";
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
        if (user!.role === UserRole.administrator) {
            return !(status === OrderStatus.AwaitsPayment || status === OrderStatus.Delivering);
        }
        return status === OrderStatus.AwaitsPayment || status === OrderStatus.Delivering;
    }

    if (!orderContext || !itemContext || !reportContext) {
        return <div aria-label={"no_context"}>
            No context is available!
        </div>
    }

    if (!order || !items) {
        return (
            <h1 className="list" aria-label={"not_found"}>
                Заказ не найден
            </h1>
        )
    }

    return (
        <Stack className="list" spacing={8} aria-label={"order_details_page"}>
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
                    <Button variant="contained" color="secondary" fullWidth startIcon={<Add />} onClick={() => {
                        if (user?.role === UserRole.individualEntity) {
                            reportContext?.generateReceipt(order.id, token!);
                        } else if (user?.role === UserRole.legalEntity) {
                            reportContext?.generateInvoice(order.id, token!);
                        }
                    }}>
                        {
                            user?.role === UserRole.individualEntity ? "Сгенерировать чек" : (
                                user?.role === UserRole.legalEntity ? "Сгенерировать счёт-фактуру" : "Сгенерировать что-то (ты админ)"
                            )
                        }
                    </Button>
                </Grid>
                <Grid size={3}>
                    <Button variant="contained"
                        disabled={order.status === OrderStatus.Cancelled || order.status === OrderStatus.Received}
                        fullWidth
                        onClick={() => {
                            orderContext?.cancelOrder(order.id!, token!).then((response) => {
                                if (response.status === 204) {
                                    setOrder({...order, status: OrderStatus.Cancelled});
                                }
                            })
                        }}
                        aria-label={"button_cancel"}
                    >
                        Отменить
                    </Button>
                    <ConfirmDialog
                        onConfirm={() => {
                            orderContext?.cancelOrder(order.id!, token!).then((response) => {
                                if (response.status === 204) {
                                    setOrder({...order, status: OrderStatus.Cancelled});
                                }
                            })
                            setCancelOrderDialogOpen(false);
                        }}
                        onClose={() => {
                            setCancelOrderDialogOpen(false)
                        }}
                        open={isCancelOrderDialogOpen}
                        title={"Вы уверены?"}
                        confirmText={"Вы действительно хотите отменить данный заказ?"} />
                </Grid>
                <Grid size={3}>
                    <Button variant="contained"
                        // onClick={handleCreateOrder}
                            aria-label={"button_next"}
                            disabled={!canNextOrderAction(order.status)}
                            fullWidth
                            onClick={() => {
                                if (user!.role === UserRole.administrator) {
                                    orderContext?.promoteOrder(order.id, token!).then((response: Order) => {setOrder(response)});
                                } else {
                                    if (order?.status === OrderStatus.AwaitsPayment) {
                                        navigate('payment')
                                    } else if (order?.status === OrderStatus.Delivering) {
                                        orderContext?.receiveOrder(order.id!, token!).then((response) => {
                                            if (response.status === 204) {
                                                setOrder({...order, status: OrderStatus.Received});
                                            }
                                        })
                                    }
                                }
                            }}
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

            <h2 aria-label={"grand_total"}>
                Итого: {
                items.items.reduce((sum: number, current: OrderItem) => sum + current.quantity * current.bought_for, 0)
            } руб.
            </h2>

        </Stack>
    );
};
