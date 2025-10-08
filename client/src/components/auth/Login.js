import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import request from "../../utils/request";
import routesConfig from "../../config";
function Login() {
  const [account, setAccount] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        jwtDecode(token);
        navigate("/");
      } catch (error) {
        navigate(routesConfig.routes.login);
      }
    }
  }, [navigate]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post("/account/login", account);
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("authToken", token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setMessage("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <section className="w-full pt-20 md:pt-28 bg-white flex justify-center">
      <div className="w-full max-w-defaultWidthLayout py-3">
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
            <div className="mx-auto w-full max-w-sm">
              <img
                alt="logo"
                src={require("../../assets/images/logo.png")}
                className="mx-auto h-10 w-auto"
              />
              <h2 className="uppercase text-4xl text-rede31 text-center font-bold mt-5">
                Đăng Nhập
              </h2>
            </div>

            <div className="mt-10 mx-auto w-full max-w-sm">
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      tabIndex={1}
                      id="username"
                      name="username"
                      type="username"
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray484"
                    >
                      Mật Khẩu
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      tabIndex={2}
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-light text-red-500">{message}</p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-rede31 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rede31"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Chưa có tài khoản?{" "}
                <Link
                  to="/account/register"
                  className="font-semibold text-rede31 hover:text-opacity-80"
                >
                  Đăng kí ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
