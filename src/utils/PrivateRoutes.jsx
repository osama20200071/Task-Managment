import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();

  // user is not loggedIn
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  // user is loggedIn
  return <Outlet />;
};

export default PrivateRoutes;
