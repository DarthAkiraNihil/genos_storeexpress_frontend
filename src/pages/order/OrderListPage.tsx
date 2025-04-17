import React, {useContext, useEffect, useState} from 'react';
import {OrderContext, useAuth} from "context";

import {Order, OrderItem} from 'models/orders';
import { OrderCard } from 'components/order';
import 'styles/items/ItemList.css'

export const OrderListPage: React.FC = ( ) => {

    const { token } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);

    const context = useContext(OrderContext);

    useEffect(() => {
        context?.getOrders(token!).then((response) => {
            setOrders(response);
        })
    }, [context, token]);

    if (!context) {
        return <div className="list">
            No context is available!
        </div>
    }

    return (
        <div className="list">
            <h1>
                Всего {orders.length} заказов
            </h1>

            {
                orders.map((order) => {
                        return (
                            <div key={order.id} className="card">
                                <OrderCard
                                    id={order.id}
                                    createdAt={order.created_at}
                                    status={order.status}
                                    total={
                                        order.items.reduce((sum: number, current: OrderItem) => sum + current.quantity * current.bought_for, 0)
                                    }
                                />
                            </div>
                        )
                    }
                )}
        </div>
    );
};
