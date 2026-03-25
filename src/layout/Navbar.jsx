import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router"

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        {token ? (
          <button onClick={() => logout()}>Log out</button>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
//Here i replaced all the links and useState and imported the NavLink, 
//Here from react-router. I turned the log out into a button. As that doesn't call a page, its more of a function