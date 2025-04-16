import React, {useContext, useEffect, useState} from 'react';
import { CartContext, ItemContext } from 'context'
import { CartItemCard } from "components/cart/CartItemCard"
import { Cart, CartItem } from "models/cart";

import 'styles/items/ItemList.css'

export const CartPage: React.FC = ( ) => {

    const [cart, setCart] = useState<Cart>();

    const cartContext = useContext(CartContext);
    const itemContext = useContext(ItemContext);

    useEffect(() => {
        cartContext?.getCart().then((response) => {
            setCart(response);
        })
    }, [cartContext]);

    if (!cartContext || !itemContext) {
        return <div>No context is available!</div>
    }

    if (!cart) {
        return (
            <h1>
                Корзина пуста
            </h1>
        )
    }

    return (
        <div className="list">
            <h1>
                Корзина
            </h1>

            {
                cart.items.map((cartItem) => {
                        return (
                            <div key={cartItem.item.id} className="card">
                                < CartItemCard
                                    id={cartItem.item.id}
                                    name={cartItem.item.name}
                                    model={cartItem.item.model}
                                    price={cartItem.item.price}
                                    quantity={cartItem.quantity}

                                    imageUrl={itemContext.getImageUrl(cartItem.item.id)}

                                    onIncrement={() => {
                                        cartContext?.incrementItemQuantity(cartItem.item.id);
                                        setCart({items:
                                            cart.items.map(
                                                (ci) => (ci.item.id === cartItem.item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
                                            )
                                        });
                                    }}
                                    onDecrement={() => {
                                        cartContext?.decrementItemQuantity(cartItem.item.id);
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
