import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../Icons/Spinner";

const PrivateRoutes = () => {
  const { user } = useAuth();

  // the check not done yet
  if (user === undefined) {
    return <Spinner size="60" />;
  }

  // check is done (user may be logged in or not)
  return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default PrivateRoutes;
