import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../Icons/Logout";
import Spinner from "../Icons/Spinner";
// import Header from "../components/Header";

const Layout = () => {
  const { handleLogout, user, isLoading } = useAuth();

  return (
    <main id="app">
      {/* <Header /> */}
      {user && (
        <div className="icon logout-icon" onClick={handleLogout}>
          <Logout />
        </div>
      )}
      {isLoading ? <Spinner size="60" /> : <Outlet />}
    </main>
  );
};

export default Layout;
