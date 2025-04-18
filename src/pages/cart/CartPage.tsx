﻿import React, {useContext, useEffect, useState} from 'react';
import {CartContext, ItemContext, OrderContext, useAuth} from 'context'
import { CartItemCard } from "components/cart/CartItemCard"
import { Cart, CartItem } from "models/cart";

import 'styles/items/ItemList.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

export const CartPage: React.FC = ( ) => {

    const { token } = useAuth();
    const [cart, setCart] = useState<Cart>();
    const [creatingOrder, setCreatingOrder] = useState<boolean>(false);

    const cartContext = useContext(CartContext);
    const itemContext = useContext(ItemContext);
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        cartContext?.getCart(token!).then((response) => {
            setCart(response);
        })
    }, [token, cartContext]);

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
                                        setCart({items:
                                            cart.items.map(
                                                (ci) => (ci.item.id === cartItem.item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
                                            )
                                        });
                                    }}
                                    onDecrement={() => {
                                        cartContext?.decrementItemQuantity(cartItem.item.id, token!);
                                        if (cartItem.quantity === 1) {
                                            setCart({items: cart.items.filter((ci) => ci.item.id !== cartItem.item.id)});
                                        } else {
                                            setCart({items:
                                                    cart.items.map(
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

            <h2>
                Итого: {
                    cart.items.reduce((sum: number, current: CartItem) => sum + current.quantity * current.item.price, 0)
                } руб.
            </h2>

        </div>
    );
};
