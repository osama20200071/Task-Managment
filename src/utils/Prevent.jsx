import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Prevent() {
  const { user } = useAuth();

  // user is loggedIn
  if (user) {
    return <Navigate to={"/"} />;
  }

  // user is not loggedIn (so can access the login and register page)
  return <Outlet />;
}

export default Prevent;
