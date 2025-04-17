import React, {useContext, useEffect, useState} from 'react';
import { ItemContext, OrderContext, useAuth } from 'context'
import { Order, OrderItem } from 'models/orders';
import 'styles/items/ItemList.css';
import Grid from '@mui/material/Grid';
import {useParams} from "react-router-dom";
import { OrderItemCard } from 'components/order';

export const OrderPage: React.FC = ( ) => {

    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order>();

    const orderContext = useContext(OrderContext);
    const itemContext = useContext(ItemContext);

    useEffect(() => {
        orderContext?.getOrderDetails(parseInt(id!, 10), token!).then((response: Order) => {
            setOrder(response);
        })
    }, [id, token, orderContext]);

    if (!orderContext || !itemContext) {
        return <div>
            No context is available!
        </div>
    }

    if (!order) {
        return (
            <h1 className="list">
                Заказ не найден
            </h1>
        )
    }

    return (
        <div className="list">
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                <Grid size="grow">
                    <h1>
                        Заказ №{order.id}
                    </h1>
                </Grid>
            </Grid>


            {
                order.items.map((orderItem) => {
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

            <h2>
                Итого: {
                order.items.reduce((sum: number, current: OrderItem) => sum + current.quantity * current.bought_for, 0)
            } руб.
            </h2>

        </div>
    );
};
