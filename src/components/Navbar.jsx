import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/" onClick={closeMenu}>
        <span>StudentSpace</span>
        <small>Store</small>
      </Link>

      <button
        className="menu-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={isOpen ? "nav-links open" : "nav-links"}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/shop" onClick={closeMenu}>
          Shop
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
        <NavLink to="/cart" onClick={closeMenu}>
          Cart <span className="cart-badge">{cartCount}</span>
        </NavLink>
        {isLoggedIn ? (
          <button className="nav-action" type="button" onClick={handleLogout}>
            Logout {user?.name ? `(${user.name})` : ""}
          </button>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu}>
              Login
            </NavLink>
            <NavLink className="signup-link" to="/signup" onClick={closeMenu}>
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
