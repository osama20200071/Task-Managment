import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main id="app">
      <header></header>
      <Outlet />
    </main>
  );
};

export default Layout;
