import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, clearCart, subtotal, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="section page-section empty-state">
        <h1>Your cart is empty</h1>
        <p>Browse the shop and add products that fit your student space.</p>
        <Link className="primary-button" to="/shop">
          Go to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="page-header cart-heading">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Your selected products</h1>
        </div>
        <button className="text-button danger" type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link className="primary-button" to="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
