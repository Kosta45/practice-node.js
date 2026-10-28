import { Link, NavLink } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        News Service
      </Link>

      <nav className="header__nav">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/create">Create News</NavLink>
      </nav>
    </header>
  );
}

export default Header;
