import { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Context
import CartProvider from "./Context/CartContext";

// USER
import { publicRoutes } from "./routes";
import DefaultLayout from "./Layout/LayoutUser";

// ADMIN
import { privateRoutes } from "./routes";
import LayoutAdmin from "./Layout/LayoutAdmin";
import ProtectedRoute from "./components/auth/ProtectedRoute";

//
import request from "./utils/request";
import routesConfig from "./config";
import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (location.pathname === routesConfig.routes.register) {
      return;
    }
    if (!token) {
      localStorage.removeItem("authToken");
      navigate(routesConfig.routes.login);
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("authToken");
          navigate(routesConfig.routes.login);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate(routesConfig.routes.login);
      }
    }
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await request.post("/incrementViews");
        localStorage.setItem("lastIncrement", new Date().toISOString());
      } catch (error) {
        console.error("Failed to increment views", error);
      }
    };

    const checkAndIncrementViews = () => {
      const lastIncrement = localStorage.getItem("lastIncrement");
      const now = new Date();

      if (
        !lastIncrement ||
        new Date(lastIncrement).getDate() !== now.getDate()
      ) {
        const timer = setTimeout(() => {
          incrementViews();
        }, 10000);

        return () => clearTimeout(timer);
      }
    };

    checkAndIncrementViews();
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = LayoutAdmin;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
