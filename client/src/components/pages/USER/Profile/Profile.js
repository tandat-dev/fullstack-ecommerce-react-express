import React from "react";
import { Routes, Route, NavLink, useParams } from "react-router-dom";

import PersonInfo from "./PersonInfo";
import OrderHistory from "./OrderHistory";

function Profile() {
  const { username } = useParams();
  return (
    <div className="w-full bg-white flex justify-center pt-20 md:pt-28">
      <div className="w-full max-w-defaultWidthLayout py-3">
        <div className="flex gap-x-6">
          <div className="hidden md:block md:w-1/4 py-3 bg-yellowffd rounded">
            <h2 className="text-xl font-bold uppercase text-center">
              Quản lý tài khoản
            </h2>
            <div className="py-2">
              <ul>
                <li className="flex">
                  <NavLink
                    to={`/account/profile/${username}`}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "text-base font-bold text-rede31 w-full h-full uppercase py-2 px-4"
                        : "text-base font-bold text-black hover:bg-graye8e transition-all w-full h-full uppercase py-2 px-4"
                    }
                  >
                    Thông tin cá nhân
                  </NavLink>
                </li>
                <li className="flex">
                  <NavLink
                    to="/account/history"
                    className={({ isActive }) =>
                      isActive
                        ? "text-base font-bold text-rede31 w-full h-full uppercase py-3 px-4"
                        : "text-base font-bold text-black hover:bg-graye8e transition-all w-full h-full uppercase py-3 px-4"
                    }
                  >
                    Lịch sử đơn hàng
                  </NavLink>
                </li>
                <li className="flex">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-base font-bold text-rede31 w-full h-full uppercase py-3 px-4"
                        : "text-base font-bold text-black hover:bg-graye8e transition-all w-full h-full uppercase py-3 px-4"
                    }
                  >
                    Quay Lại
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <Routes>
              <Route path="/" element={<PersonInfo />} />

              <Route path="/history" element={<OrderHistory />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
