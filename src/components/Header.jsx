import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </header>
  );
}

export default Header;
