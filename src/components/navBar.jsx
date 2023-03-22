import { NavLink} from "react-router-dom";

const NavBar = () => {
  return (
      <nav className="navbar navbar-expand navbar-light bg-light">
          <a className="navbar-brand">Vidly</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">
            Rentals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
