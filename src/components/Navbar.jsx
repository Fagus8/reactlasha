import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🎓 EduPlatform</Link>
      </div>
      <div className="nav-links">
        <NavLink to="/" end>მთავარი</NavLink>
        <NavLink to="/courses">კურსები</NavLink>
        <NavLink to="/add-course">კურსის დამატება</NavLink>
        <NavLink to="/about">ჩვენ შესახებ</NavLink>
      </div>
      <div className="cart-badge">
        🛒 კალათა: <span>{cartItems.length}</span>
      </div>
    </nav>
  );
}
