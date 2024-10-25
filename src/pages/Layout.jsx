import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../Icons/Logout";
import Header from "../components/Header";

const Layout = () => {
  const { handleLogout, user } = useAuth();
  return (
    <main id="app">
      {/* <Header /> */}
      {user && (
        <div className="icon logout-icon" onClick={handleLogout}>
          <Logout />
        </div>
      )}
      <Outlet />
    </main>
  );
};

export default Layout;
