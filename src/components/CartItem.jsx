import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>${item.price} each</p>
        <button
          className="text-button"
          type="button"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
      <div className="quantity-controls">
        <button type="button" onClick={() => decreaseQuantity(item.id)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => increaseQuantity(item.id)}>
          +
        </button>
      </div>
      <strong className="cart-line-total">
        ${(item.price * item.quantity).toFixed(2)}
      </strong>
    </div>
  );
}

export default CartItem;
