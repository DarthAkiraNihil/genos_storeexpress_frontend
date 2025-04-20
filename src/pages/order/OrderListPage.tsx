import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {OrderContext, useAuth} from "context";

import {Order} from 'models/orders';
import { OrderCard } from 'components/order';
import 'styles/items/ItemList.css'
import {useSearchParams} from "react-router-dom";
import {PaginatedList} from "../../models";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const OrderListPage: React.FC = ( ) => {

    const { token } = useAuth();

    const [orders, setOrders] = useState<PaginatedList<Order>>();
    const [params] = useSearchParams();

    const context = useContext(OrderContext);

    useEffect(() => {
        if (params.has('pageNumber')) {
            context?.getOrders(token!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setOrders(response);
            })
        } else {
            context?.getOrders(token!, 0, 10).then((response) => {
                setOrders(response);
            })
        }
    }, [params, context, token]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setOrders(undefined);
        context?.getOrders(token!, page, 10).then((response) => {
            setOrders(response);
        })
    }

    if (!context) {
        return <div className="list">
            No context is available!
        </div>
    }

    if (!orders || orders.count === 0) {
        return <h1>
            У вас не было заказов
        </h1>
    }

    return (
        <Stack className="list" spacing={8} >
            <Box display="flex" justifyContent="center">
                <h1>
                    Всего {orders.items.length} заказов
                </h1>
            </Box>

            <Box display="flex" justifyContent="center">
                {
                    orders.items.map((order) => {
                            return (
                                <div key={order.id} className="card">
                                    <OrderCard
                                        id={order.id}
                                        createdAt={order.created_at}
                                        status={order.status}
                                        total={
                                            0
                                        }
                                    />
                                </div>
                            )
                        }
                    )}
            </Box>

            <Box display="flex" justifyContent="center">
                <Pagination count={Math.floor(orders.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                            sx={{justifyContent: "center", alignItems: "center"}} />
            </Box>

        </Stack>
    );
};
