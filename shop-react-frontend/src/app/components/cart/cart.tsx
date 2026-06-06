import { useEffect } from "react";
import "./cart.scss";
import { useCartStore } from "../../stores/cartStore";

export const Cart = () => {

    const cart = useCartStore(state => state.cart);

    const cartTotal = cart.reduce((total, item) => {
        const itemPrice = item.product?.price ?? 0;
        return total + itemPrice * item.count;
    }, 0);

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
                                    <div className="cart-item-count">{item.count}</div>
                                    <div className="cart-item-price">${price.toFixed(2)}</div>
                                    <div className="cart-item-total">${(price * item.count).toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <span>Order total</span>
                        <strong>${cartTotal.toFixed(2)}</strong>
                    </div>
                </>
            )}
        </div>
    );
}