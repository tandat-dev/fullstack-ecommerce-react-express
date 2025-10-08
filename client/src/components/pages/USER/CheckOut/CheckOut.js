import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../../Context/CartContext";
import routesConfig from "../../../../config";
import config from "../../../../utils/config";
import request from "../../../../utils/request";

function CheckOut() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    shipping: "GHTK",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleRemove = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const orderData = {
      ...formData,
      status: "Processing",
      items: cart.map((product) => ({
        product_name: product.name,
        quantity: product.quantity,
        price_item: product.price,
        total_price: product.price * product.quantity,
      })),
    };

    try {
      const response = await request.post("/addOrders", orderData);
      if (response.status === 201) {
        setCart([]);
        navigate(routesConfig.routes.thanks);
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Xin vui lòng thử lại");
    }
  };

  const orderTotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shippingFee = 30000;
  const finalTotal = orderTotal + shippingFee;

  return (
    <div className="pt-20 md:pt-28">
      <section className="container mx-auto max-w-defaultWidthLayout py-6 px-0 md:px-32">
        <div className="flex flex-col md:flex-row md:justify-between items-center border-b bg-white py-4">
          <div className="flex flex-col items-center">
            <div>
              <Link to={routesConfig.routes.home}>
                <img
                  className="size-20 md:size-14 object-contain"
                  src={require("../../../../assets/images/logo.png")}
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="mt-4 py-2 text-xs">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2">
                <li className="flex items-center space-x-3 text-left">
                  <ion-icon
                    class="size-6 text-green-500"
                    name="checkmark-circle-outline"
                  ></ion-icon>
                  <span className="font-semibold text-gray-900">Giỏ hàng</span>
                </li>
                <ion-icon
                  class="size-4 text-gray-400"
                  name="chevron-forward-outline"
                ></ion-icon>
                <li className="flex items-center space-x-3 text-left">
                  <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                    2
                  </p>
                  <span className="font-semibold text-gray-900">
                    Vận chuyển
                  </span>
                </li>
                <ion-icon
                  class="size-4 text-gray-400"
                  name="chevron-forward-outline"
                ></ion-icon>
                <li className="flex items-center space-x-3 text-left">
                  <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    3
                  </p>
                  <span className="font-semibold text-gray-500">
                    Thanh toán
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Đơn Hàng</p>
            <p className="text-gray-400">
              Kiểm tra sản phẩm của bạn. Và lựa chọn phương thức vận chuyển phù
              hợp.
            </p>
            <div
              id="listOrder"
              className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 h-80 overflow-y-scroll"
            >
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
                  images.length > 0 ? `${config.UPLOAD_URL}/${images[0]}` : "";
                return (
                  <div
                    key={index}
                    className="flex flex-row rounded-lg bg-white"
                  >
                    <div className="h-24 w-24 flex items-center flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        className="w-3/4 h-3/4 object-contain mx-auto"
                        src={imageUrl}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex w-full flex-col px-4 py-4">
                      <span id="product" className="font-semibold line-clamp-2">
                        {product.name}
                      </span>
                      <span id="quantity" className="float-right text-gray-400">
                        Quantity: {product.quantity}
                      </span>
                      <div className="flex items-center justify-between">
                        <p
                          id="price"
                          className="text-lg font-medium text-rede31"
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price * product.quantity)}
                        </p>
                        <button onClick={() => handleRemove(product.id)}>
                          <ion-icon
                            class="size-6 text-red-500 md hydrated"
                            name="trash-outline"
                            role="img"
                          ></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <p className="mt-8 text-lg font-medium">Phương thức vận chuyển</p>
              <div className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="shipping"
                    value="GHTK"
                    checked={formData.shipping === "GHTK"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-rede31 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-rede31 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_1"
                  >
                    <img
                      className="w-14 object-contain rounded-md"
                      src={require("../../../../assets/images/shipghtk.png")}
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">GHTK</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Giao từ: 2-4 ngày
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="shipping"
                    value="GHN"
                    checked={formData.shipping === "GHN"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-rede31 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-rede31 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-14 object-contain rounded-md"
                      src={require("../../../../assets/images/shipghn.png")}
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">GHN</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Giao từ: 2-4 ngày
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8">
            <p className="text-xl font-medium">Chi tiết thanh toán</p>
            <p className="text-gray-400">
              Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh
              toán của bạn.
            </p>
            <div>
              <label
                htmlFor="fullname"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Họ & Tên
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-rede31 focus:ring-rede31"
                  placeholder="Nhập đầy đủ họ tên"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon
                    className="w-4 h-4 text-gray-400 md hydrated"
                    name="card-outline"
                    role="img"
                  ></ion-icon>
                </div>
              </div>
              <label
                htmlFor="phone"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Số ĐT
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-rede31 focus:ring-rede31"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon
                    className="w-4 h-4 text-gray-400 md hydrated"
                    name="call-outline"
                    role="img"
                  ></ion-icon>
                </div>
              </div>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-rede31 focus:ring-rede31"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon
                    className="w-4 h-4 text-gray-400 md hydrated"
                    name="mail-outline"
                    role="img"
                  ></ion-icon>
                </div>
              </div>
              <label
                htmlFor="address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Địa Chỉ
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-rede31 focus:ring-rede31"
                  placeholder="Nhập địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <ion-icon
                    className="w-4 h-4 text-gray-400 md hydrated"
                    name="location-outline"
                    role="img"
                  ></ion-icon>
                </div>
              </div>
              <div id="listTotal" className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Tiền đơn hàng
                  </p>
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderTotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Phí giao hàng
                  </p>
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(shippingFee)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(finalTotal)}
                </p>
              </div>
              {error && (
                <p className="text-xs font-light text-red-500">{error}</p>
              )}
            </div>
            <button
              type="button"
              name="btnDatHang"
              className="mt-4 mb-8 w-full rounded-md bg-rede31 transition-all px-6 py-3 font-medium text-white hover:bg-ylf6"
              onClick={handleCheckout}
            >
              Đặt Hàng
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckOut;
