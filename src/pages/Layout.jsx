import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../Icons/Logout";
import Spinner from "../Icons/Spinner";

const Layout = () => {
  const { handleLogout, user, isLoading } = useAuth();

  return (
    <main id="app">
      {user && (
        <>
          <div className="icon logout-icon" onClick={handleLogout}>
            <Logout />
          </div>
          <div className="icon profile-icon">
            {/* navigate to user profile */}
            {/* <ProfileIcon /> */}
          </div>
        </>
      )}
      {isLoading ? <Spinner size="60" /> : <Outlet />}
    </main>
  );
};

export default Layout;
