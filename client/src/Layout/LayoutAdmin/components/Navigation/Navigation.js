import { NavLink, Link, useNavigate } from "react-router-dom";

import routesConfig from "../../../../config";

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(routesConfig.routes.login);
  };
  return (
    <div className="transition-all w-72 bg-blue287 h-screen pt-8 pb-4 overflow-y-auto">
      <ul className="space-y-4 px-4">
        <li className="mb-10">
          <Link
            to={routesConfig.routes.dashboard}
            className="flex items-center text-white"
          >
            <img
              className="size-14 object-contain"
              src={require("../../../../assets/images/logo.png")}
              alt=""
            />
            <span className="ml-3 text-3xl font-bold tracking-wide">
              FastFood
            </span>
          </Link>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.dashboard}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="home-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.categories}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="grid-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.products}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="cube-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.orders}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="pulse-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.news}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="newspaper-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">News</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.contacts}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="document-text-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Contacts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routesConfig.routes.users}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-all ease-in-out ${
                isActive
                  ? "bg-white text-blue287"
                  : "text-white hover:bg-white hover:text-blue287"
              }`
            }
          >
            <span className="text-3xl">
              <ion-icon
                name="lock-closed-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Users</span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center text-white p-2 rounded-lg transition-all ease-in-out hover:bg-white hover:text-blue287 w-full"
          >
            <span className="text-3xl">
              <ion-icon
                name="log-out-outline"
                role="img"
                class="md hydrated"
              ></ion-icon>
            </span>
            <span className="ml-3 text-lg font-normal">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
