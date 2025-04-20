import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {CartContext, ItemContext, OrderContext, useAuth} from 'context'
import { CartItemCard } from "components/cart/CartItemCard"
import { Cart, CartItem } from "models/cart";

import 'styles/items/ItemList.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {ItemListCard} from "../../components/items";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {PaginatedList} from "../../models";
import {useSearchParams} from "react-router-dom";

export const CartPage: React.FC = ( ) => {

    const { token } = useAuth();
    const [cart, setCart] = useState<PaginatedList<CartItem>>();
    const [creatingOrder, setCreatingOrder] = useState<boolean>(false);

    const [ params ] = useSearchParams();

    const cartContext = useContext(CartContext);
    const itemContext = useContext(ItemContext);
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        if (params.has('pageNumber')) {
            cartContext?.getCart(token!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setCart(response);
            })
        } else {
            cartContext?.getCart(token!, 0, 10).then((response) => {
                setCart(response);
            })
        }
    }, [params, token, cartContext]);

    if (!cartContext || !itemContext || !orderContext) {
        return <div>
            No context is available!
        </div>
    }

    if (!cart || cart.items.length === 0) {
        return (
            <h1 className="list">
                Корзина пуста
            </h1>
        )
    }

    const handleCreateOrder = async () => {
        console.log("handleCreateOrder");
        setCreatingOrder(true);
        try {
            orderContext.createOrder(token!).then((response) => {
                console.log("createOrder", response);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setCreatingOrder(false);
        }
    }

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setCart(undefined);
        cartContext?.getCart(token!, page, 10).then((response) => {
            setCart(response);
        })
    }

    return (
        <Stack className="list" spacing={8} >
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                <Grid size="grow">
                    <h1>
                        Корзина
                    </h1>
                </Grid>
                <Grid size={2}>
                    <Button variant="contained"
                            onClick={handleCreateOrder} disabled={creatingOrder}
                            endIcon={creatingOrder ? <CircularProgress size={20} /> : null}
                            fullWidth
                    >
                        Оформить заказ
                    </Button>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
                {
                    cart.items.map((cartItem) => {
                            return (
                                <div key={cartItem.item.id} className="card">
                                    < CartItemCard
                                        name={cartItem.item.name}
                                        model={cartItem.item.model}
                                        price={cartItem.item.price}
                                        quantity={cartItem.quantity}

                                        imageUrl={itemContext.getImageUrl(cartItem.item.id)}

                                        onIncrement={() => {
                                            cartContext?.incrementItemQuantity(cartItem.item.id, token!);
                                            setCart({
                                                ...cart,
                                                items: cart.items.map(
                                                    (ci) => (ci.item.id === cartItem.item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
                                                )
                                            });
                                        }}
                                        onDecrement={() => {
                                            cartContext?.decrementItemQuantity(cartItem.item.id, token!);
                                            if (cartItem.quantity === 1) {
                                                setCart({
                                                    ...cart,
                                                    items: cart.items.filter((ci) => ci.item.id !== cartItem.item.id)
                                                });
                                            } else {
                                                setCart({
                                                    ...cart,
                                                    items: cart.items.map(
                                                        (ci) => (ci.item.id === cartItem.item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
                                                    )
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            )
                        }
                    )
                }
            </Box>



            <Box display="flex" justifyContent="center">
                <Pagination count={Math.floor(cart.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                            sx={{justifyContent: "center", alignItems: "center"}} />
            </Box>

            <h2>
                Итого: {
                cart.items.reduce((sum: number, current: CartItem) => sum + current.quantity * current.item.price, 0)
            } руб.
            </h2>

        </Stack>

    );
};
