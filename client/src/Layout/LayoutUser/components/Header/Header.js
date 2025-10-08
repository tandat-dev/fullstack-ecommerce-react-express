import { useState, useEffect, useContext, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import TippyHeadLess from "@tippyjs/react/headless";
import { jwtDecode } from "jwt-decode";
import { CartContext } from "../../../../Context/CartContext";

import request from "../../../../utils/request";
import routesConfig from "../../../../config";
import config from "../../../../utils/config";
function Header() {
  const { cart, setCart } = useContext(CartContext);
  const [account, setAccount] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShoppingCart, setIsShoppingCart] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertEmptyCart, setShowAlertEmptyCart] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const userRef = useRef(null);

  useEffect(() => {
    if (token) {
      userRef.current = jwtDecode(token);
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAccount(false);
    navigate(routesConfig.routes.login);
  };

  const handleIncrement = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) => {
        if (product.id === productId) {
          if (product.quantity + 1 > product.stock) {
            setShowAlertError(true);
            setTimeout(() => {
              setShowAlertError(false);
            }, 700);
            return product;
          }
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      return updatedCart;
    });
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleRemove = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setShowAlertEmptyCart(true);
      setTimeout(() => {
        setShowAlertEmptyCart(false);
      }, 2000);
    } else {
      setIsShoppingCart(false);
      navigate(routesConfig.routes.checkout);
    }
  };

  const totalQuantity = cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      // Nếu không có token, không cần kiểm tra
      if (!token) {
        console.log("Token is missing");
        return;
      }

      // Kiểm tra token
      try {
        // Gửi request đến server để xác thực token
        const response = await request.get("/account/verify/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Kiểm tra nếu token hết hạn
        if (response.data.expired) {
          console.log("Token has expired");
          localStorage.removeItem("authToken");
          navigate("/account/login");
        }
        setAccount(response.data.user);
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.removeItem("authToken");
        navigate("/account/login");
        setAccount(false);
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div>
      {/* Alert */}
      {showAlertError && (
        <div
          role="alert"
          className={`fixed top-24 md:top-32 right-3 z-50 transition-transform transform ${
            showAlertError ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Thất Bại
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-green-700">
            <p>Sản phẩm vượt quá số lượng hiện có</p>
          </div>
        </div>
      )}
      {showAlertEmptyCart && (
        <div
          role="alert"
          className={`max-w-[400px] fixed top-24 md:top-32 right-3 z-50 transition-transform transform ${
            showAlertEmptyCart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="text-center md:text-start bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Giỏ hàng của bạn chưa có sản phẩm
          </div>
          <div className="text-center md:text-start border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-green-700">
            <p>
              Trước khi tiếp tục đến trang thanh toán, hãy thêm sản phẩm vào giỏ
              hàng của bạn
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="w-full fixed top-0 left-0 right-0 z-40 bg-rede31 flex justify-center">
        <section className="w-full max-w-defaultWidthLayout p-3">
          <div className="flex justify-between items-center">
            <div className="md:hidden z-40">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <ion-icon
                  class="size-10 text-white transition-all"
                  name={isMenuOpen ? "close-outline" : "menu-outline"}
                ></ion-icon>
              </button>
            </div>
            {/* Logo */}
            <div className="flex flex-col items-center z-40">
              <Link to={routesConfig.routes.home}>
                <div>
                  <img
                    className="size-14 object-contain"
                    src={require("../../../../assets/images/logo.png")}
                    alt=""
                  />
                </div>
              </Link>
              <h2 className="hidden md:inline-flex text-2xl uppercase text-white font-bold tracking-widest">
                FastFood
              </h2>
            </div>
            {/* Nav */}
            <ul
              className={`flex md:flex-row md:static md:gap-x-6 md:h-auto md:bg-transparent p-4 fixed z-30 top-20 left-0 w-full h-screen flex-col justify-center items-center bg-gray-500 bg-opacity-70 transition-transform duration-300 ease-in-out ${
                isMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full md:translate-x-0"
              }`}
            >
              <li className="text-lg font-bold transition-all hover:text-white -mt-10 m-10 md:m-0">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white p-2" : "p-2"
                  }
                  to={routesConfig.routes.home}
                >
                  Trang Chủ
                </NavLink>
              </li>
              <li className="text-xl font-bold transition-all hover:text-white m-10 md:m-0">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white p-2" : "p-2"
                  }
                  to={routesConfig.routes.shop}
                >
                  Thực Đơn
                </NavLink>
              </li>
              <li className="text-lg font-bold transition-all  hover:text-white m-10 md:m-0">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white p-2" : "p-2"
                  }
                  to={routesConfig.routes.new}
                >
                  Tin Tức
                </NavLink>
              </li>
              <li className="text-lg font-bold transition-all  hover:text-white m-10 md:m-0">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white p-2" : "p-2"
                  }
                  to={routesConfig.routes.about}
                >
                  Giới Thiệu
                </NavLink>
              </li>
              <li className="text-lg font-bold transition-all  hover:text-white m-10 md:m-0">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white p-2" : "p-2"
                  }
                  to={routesConfig.routes.contact}
                >
                  Liên Hệ
                </NavLink>
              </li>
            </ul>
            {/* icon */}
            <div className="flex gap-x-4 z-40">
              <div className="relative">
                <button onClick={() => setIsShoppingCart(!isShoppingCart)}>
                  <ion-icon
                    class="size-10 text-white"
                    name="cart-outline"
                  ></ion-icon>
                </button>
                <p className="absolute -top-2 -right-2 flex items-center justify-center text-rede31 text-base font-medium bg-whitef4d size-6 rounded-full">
                  {totalQuantity}
                </p>
              </div>
              {account ? (
                <div className="size-10 rounded-full border-2">
                  <TippyHeadLess
                    interactive
                    delay={[200, 500]}
                    render={() => {
                      return (
                        <ul className="min-w-[225px] text-sm font-normal text-gray484 bg-white rounded-lg shadow">
                          <li className=" flex hover:bg-graye8e rounded-t-lg">
                            <Link
                              to={`/account/profile/${account.username}`}
                              className="w-full h-full py-3 px-4"
                            >
                              Xem hồ sơ
                            </Link>
                          </li>
                          <li className="flex hover:bg-graye8e border-t">
                            <Link to="/" className="w-full h-full py-3 px-4">
                              Lịch sử mua hàng
                            </Link>
                          </li>
                          {userRef.current.role === "admin" && (
                            <li className="flex hover:bg-graye8e border-t">
                              <Link
                                to={routesConfig.routes.dashboard}
                                className="w-full h-full py-3 px-4"
                              >
                                Đến trang quản lý
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
                      );
                    }}
                  >
                    <img
                      src={require("../../../../assets/images/memberMale.png")}
                      alt="avatar"
                      className="w-full h-full object-container rounded-full"
                    />
                  </TippyHeadLess>
                </div>
              ) : (
                <TippyHeadLess
                  interactive
                  delay={[200, 500]}
                  render={() => {
                    return (
                      <ul className="min-w-[225px] text-sm font-normal text-gray484 bg-white rounded-lg shadow">
                        <li className=" flex hover:bg-graye8e rounded-t-lg">
                          <Link
                            to="/account/login"
                            className="w-full h-full py-3 px-4"
                          >
                            Đăng nhập
                          </Link>
                        </li>
                        <li className="flex hover:bg-graye8e border-t">
                          <Link
                            to="/account/register"
                            className="w-full h-full py-3 px-4"
                          >
                            Đăng kí
                          </Link>
                        </li>
                      </ul>
                    );
                  }}
                >
                  <ion-icon
                    class="size-10 text-white"
                    name="person-circle-outline"
                  ></ion-icon>
                </TippyHeadLess>
              )}
            </div>
          </div>
        </section>
      </header>
      {/* Shopping Cart */}
      {isShoppingCart && (
        <div
          className="relative z-30 transition-all ease-in-out duration-500"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md mt-20 md:mt-28">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Giỏ Hàng
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={() => setIsShoppingCart(!isShoppingCart)}
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart.length > 0 ? (
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cart.map((product, index) => {
                                let images = [];
                                try {
                                  images = Array.isArray(product.images)
                                    ? product.images
                                    : JSON.parse(product.images);
                                } catch (e) {
                                  console.error("Failed to parse images:", e);
                                }
                                const imageUrl =
                                  images.length > 0
                                    ? `${config.UPLOAD_URL}/${images[0]}`
                                    : "";
                                return (
                                  <li key={index} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        className="w-full h-full object-contain"
                                        src={imageUrl}
                                        alt="Product1"
                                      />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <h1>{product.name}</h1>
                                        <p className="mt-1 text-sm text-rede31">
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(product.price)}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-x-2">
                                          <button
                                            onClick={() =>
                                              handleDecrement(product.id)
                                            }
                                          >
                                            <ion-icon
                                              name="remove-outline"
                                              role="img"
                                              class="md hydrated"
                                            ></ion-icon>
                                          </button>
                                          <input
                                            className="border text-center rounded-md bg-[#D9D9D9] size-9 text-black"
                                            type="text"
                                            name="Quantity"
                                            id="Quantity"
                                            value={product.quantity}
                                          />
                                          <button
                                            onClick={() =>
                                              handleIncrement(product.id)
                                            }
                                          >
                                            <ion-icon
                                              name="add-outline"
                                              role="img"
                                              class="md hydrated"
                                            ></ion-icon>
                                          </button>
                                        </div>
                                        <div className="flex">
                                          <button
                                            onClick={() =>
                                              handleRemove(product.id)
                                            }
                                          >
                                            <ion-icon
                                              class="size-6 text-rede31 md hydrated"
                                              name="trash-outline"
                                              role="img"
                                            ></ion-icon>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="flex flex-col justify-center items-center text-center">
                              <div>
                                <ion-icon
                                  class="size-32 text-rede31 text-opacity-20"
                                  name="cart-outline"
                                ></ion-icon>
                              </div>
                              <h1 className="uppercase text-2xl font-bold">
                                Giỏ hàng đang trống
                              </h1>
                              <p className="text-sm text-gray484 mt-2">
                                Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ
                                hàng. Hãy duyệt qua các sản phẩm yêu thích và
                                thêm chúng vào giỏ để tiếp tục mua sắm!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tổng Tiền:</p>
                        <p>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Tổng tiền chưa bao gồm phí ship
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-rede31 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-80"
                        >
                          Thanh Toán
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to={routesConfig.routes.shop}>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Tiếp tục mua sắm
                            <span aria-hidden="true"> →</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
