import TippyHeadLess from "@tippyjs/react/headless";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import routesConfig from "../../../../config";
function Header({ toggleNavigation }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const userRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate(routesConfig.routes.login);
    } else {
      try {
        userRef.current = jwtDecode(token);
      } catch {
        navigate(routesConfig.routes.login);
      }
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };
  return (
    <div className="flex justify-between items-center mb-6 ">
      <div>
        <ion-icon
          onClick={toggleNavigation}
          class="size-10 md hydrated"
          name="menu-outline"
          role="img"
        ></ion-icon>
      </div>
      <div className="w-2/5 justify-center">
        <div className="relative text-lg">
          <input
            type="text"
            className="bg-gray-200 text-gray-700 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 w-full"
            placeholder="Search here"
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500">
            <ion-icon
              name="search-outline"
              role="img"
              class="md hydrated"
            ></ion-icon>
          </div>
        </div>
      </div>
      {/* <!-- Avata --> */}
      <div>
        <div className="cursor-pointer w-12 h-12 rounded-full border-2 border-gray-300">
          <TippyHeadLess
            interactive
            delay={[200, 500]}
            render={() => {
              return (
                <div className="p-4 text-sm text-white bg-blue287 min-w-[250px] rounded">
                  <div>Welcome:</div>
                  <div className="truncate font-bold">
                    {userRef.current.fullname || "FastFood"}
                  </div>
                  <div className="flex gap-x-1">
                    <div>Role:</div>
                    <div className="font-bold truncate uppercase">
                      {userRef.current.role || "Chưa có"}
                    </div>
                  </div>
                  <ul className="mt-3 text-sm font-normal text-gray484 bg-white rounded-lg shadow">
                    <li className=" flex hover:bg-graye8e rounded-t-lg">
                      <Link
                        to={`/account/profile/${userRef.current.username}`}
                        className="w-full h-full py-3 px-4"
                      >
                        Xem hồ sơ
                      </Link>
                    </li>
                    {userRef.current.role === "admin" && (
                      <li className="flex hover:bg-graye8e border-t">
                        <Link
                          to={routesConfig.routes.home}
                          className="w-full h-full py-3 px-4"
                        >
                          Đến trang người dùng
                        </Link>
                      </li>
                    )}
                    <li className="flex text-rede31 hover:bg-graye8e border-t rounded-b-lg">
                      <button
                        onClick={handleLogout}
                        className="w-full h-full py-3 px-4 text-start"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              );
            }}
          >
            <img
              src={require("../../../../assets/images/memberMale.png")}
              alt="User"
              className="w-full h-full object-cover"
            />
          </TippyHeadLess>
        </div>
      </div>
    </div>
  );
}

export default Header;
