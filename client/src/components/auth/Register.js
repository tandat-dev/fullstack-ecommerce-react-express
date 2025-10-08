import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import request from "../../utils/request";

function Register() {
  const [account, setAccount] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (account.password !== account.confirmPassword) {
      setMessage("Xác nhận mật khẩu không trùng khớp");
      return;
    } else {
      setMessage("");
    }
  }, [account.password, account.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account.password !== account.confirmPassword) {
      return;
    }
    try {
      const res = await request.post("/account/register", account);
      if (res.status === 201) {
        setResult("Đăng kí thành công");
        setAccount({});
      } else {
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch {
      setMessage("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.");
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
                Đăng Kí Tài Khoản
              </h2>
            </div>

            <div className="mt-10 mx-auto w-full max-w-sm">
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Họ và tên
                  </label>
                  <div className="mt-2">
                    <input
                      tabIndex={1}
                      id="fullname"
                      name="fullname"
                      type="text"
                      value={account.fullname || ""}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      tabIndex={2}
                      id="username"
                      name="username"
                      type="text"
                      value={account.username || ""}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      tabIndex={3}
                      id="email"
                      name="email"
                      type="email"
                      value={account.email || ""}
                      onChange={handleChange}
                      placeholder="Email"
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
                      tabIndex={4}
                      id="password"
                      name="password"
                      type="password"
                      value={account.password || ""}
                      onChange={handleChange}
                      placeholder="Mật khẩu"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm/6 font-medium text-gray484"
                    >
                      Xác nhận mật khẩu
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      tabIndex={5}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={account.confirmPassword || ""}
                      onChange={handleChange}
                      required
                      placeholder="Xác nhận mật khẩu"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-medium text-gray484"
                    >
                      Số điện thoại
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      tabIndex={6}
                      id="phone"
                      name="phone"
                      type="tel"
                      value={account.phone || ""}
                      onChange={handleChange}
                      required
                      placeholder="Số điện thoại"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-light text-red-500">{message}</p>
                  <p className="text-xs font-light text-green-500">{result}</p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-rede31 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rede31"
                  >
                    Đăng kí
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Đã có tài khoản?{" "}
                <Link
                  to="/account/login"
                  className="font-semibold text-rede31 hover:text-opacity-80"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
