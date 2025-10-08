import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import request from "../../../../utils/request";
import routesConfig from "../../../../config";

function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await request.get(`/orders/details/${orderId}`);
        setOrderDetails(res.data.details);
        setOrderInfo(res.data.order);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  return (
    <section className="container mx-auto">
      <div className="flex items-center justify-between">
        <nav>
          <ul className="flex gap-x-3 items-center">
            <li className="text-gray33 opacity-50 font-extralight text-base">
              <button className="text-gray33 opacity-50 font-extralight text-base">
                Pages
              </button>
            </li>
            <li>/</li>
            <li className="font-extralight text-base">
              <button className="font-extralight text-base">
                Order Details
              </button>
            </li>
          </ul>
          <ul>
            <li className="text-2xl font-bold">
              <button className="text-2xl font-bold">Order Details</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Our Order Details
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail, index) => (
                <tr key={detail.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{detail.product_name}</td>
                  <td className="px-12 py-4">{detail.quantity}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(detail.price_item)}
                  </td>
                  <th className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(detail.total_price)}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between p-5 text-lg font-bold">
            <p>Total Price</p>
            <div className="mr-16">
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  orderDetails.reduce(
                    (sum, detail) => sum + detail.total_price,
                    30000
                  )
                )}
              </p>
              <h5 className="text-xs font-extralight text-gray4f">
                (Gồm cả phí ship)
              </h5>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Thông Tin Khách Hàng
          </h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Our Order Details
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 uppercase font-medium text-gray-900 whitespace-nowrap"
                >
                  {orderInfo.fullname}
                </th>
                <td className="px-6 py-4">{orderInfo.phone}</td>
                <td className="px-6 py-4">{orderInfo.email}</td>
                <td className="px-6 py-4">{orderInfo.address}</td>
                <td className="px-6 py-4">
                  <Link to={routesConfig.routes.orders}>
                    <button className="text-blue-500">Quay Về</button>
                  </Link>{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
