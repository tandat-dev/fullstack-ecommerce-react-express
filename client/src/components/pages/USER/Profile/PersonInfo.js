import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import request from "../../../../utils/request";
function PersonInfo() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const res = await request.get(`/account/info/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res.data) {
          setAccount(res.data);
        } else {
          console.error("No account data found");
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchAccountInfo();
  }, [username]);

  if (!account) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0">
      <h2 className="uppercase text-2xl text-rede31 font-bold mb-5">
        Quản Lý Tài Khoản
      </h2>
      <p className="text-base font-normal mb-3">
        Xin Chào, <strong className="font-bold">{account.fullname}</strong>. Với
        trang này, bạn sẽ xem được tất cả thông tin tài khoản của mình
      </p>
      <h1 className="uppercase text-2xl font-bold text-black p-4 bg-yellowffc">
        Thông Tin Cá Nhân
      </h1>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="border-t border-gray-200 px-4 py-5">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd className="mt-1 text-sm text-gray-900">{account.fullname}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">
                Địa chỉ email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                {account.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                {account.phone}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3">
              <dt className="text-sm font-medium text-gray-500">
                Địa chỉ giao hàng
              </dt>
              <dd className="mt-1 text-sm text-gray-900">Chưa cập nhật</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default PersonInfo;
