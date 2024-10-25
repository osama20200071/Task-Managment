import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./pages/Layout.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import HomePage from "./pages/Home.jsx";
import AuthContext from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store/ReduxStore.js";
import Prevent from "./utils/Prevent.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <Provider store={store}>
                  <HomePage />
                </Provider>
              }
            />
          </Route>
          <Route element={<Prevent />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<>not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthContext>
);
