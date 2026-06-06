import { useEffect, useMemo } from "react";
import "./cart.scss";
import { useCartStore } from "../../stores/cartStore";
import { CartItem, ProductData } from "../../models/products.model";

export const Cart = () => {

    const cart = useCartStore(state => state.cart);
    const setCart = useCartStore(state => state.setCart);
    const clearCart = useCartStore(state => state.clearCart);

    const cartTotal: number = useMemo(() => {
        return cart.reduce((total, item) => {
            const itemPrice = item.product?.price ?? 0;
            return total + itemPrice * item.count;
        }, 0)
    }, [cart]);

    const changeCount = (cartItem: CartItem, action: "ADD" | "REMOVE") => {
        let newCart: CartItem[];

        switch (action) {
            case "ADD":
                newCart = cart.map(i => {
                    if (i.product.id === cartItem.product.id) {
                        return { ...i, count: i.count + 1 }
                    } else {
                        return i;
                    }
                })
                break;
            case "REMOVE":
                if (cartItem.count === 1) {
                    newCart = cart.filter(i => i.product.id !== cartItem.product.id);
                } else if (cartItem.count > 1) {
                    newCart = cart.map(i => {
                        if (i.product.id === cartItem.product.id) {
                            return { ...i, count: i.count - 1 }
                        } else {
                            return i;
                        }
                    })
                }
            break;
        }

        setCart(newCart);
    }

    const removeItem = (item: CartItem) => {
        setCart(cart.filter(i => i.product.id !== item.product.id));
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="cart-empty">Your cart is empty.</div>
            ) : (
                <>
                    <div className="cart-list-header">
                        <span>Product</span>
                        <span className="align-right">Qty</span>
                        <span className="align-right">Price</span>
                        <span className="align-right">Total</span>
                        <span className="align-right"></span>
                    </div>

                    <div className="cart-list">
                        {cart.map((item, index) => {
                            const product = item.product;
                            const price = product?.price ?? 0;
                            return (
                                <div key={`${product?.id ?? index}-${index}`} className="cart-item">
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{product?.name ?? "Unnamed Product"}</div>
                                        <div className="cart-item-category">{product?.category?.name ?? "No category"}</div>
                                    </div>
                                    <div className="cart-item-count">
                                        <button className="cart-decrease" onClick={() => changeCount(item, "REMOVE")}>-</button>
                                        {item.count}
                                        <button className="cart-increase" onClick={() => changeCount(item, "ADD")}>+</button>
                                    </div>
                                    <div className="cart-item-price">${price.toFixed(2)}</div>
                                    <div className="cart-item-total">${(price * item.count).toFixed(2)}</div>
                                    <div className="cart-item-controls">
                                        <button className="remove-btn" onClick={() => removeItem(item)}></button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <div className="order-total">
                            <span>Order total</span>
                            <strong>${cartTotal.toFixed(2)}</strong>
                        </div>
                        

                        <div className="cart-actions">
                            <button className="clear-cart" onClick={() => clearCart()}>Clear cart</button>
                            <button className="create-order">Create order</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}