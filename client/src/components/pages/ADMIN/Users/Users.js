import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import routes from "../../../../config/routes";
import request from "../../../../utils/request";
function Users() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("/account/all");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [reload]);

  const handleAdd = () => {
    setIsModalOpen(true);
    setAction("add");
    setUser({
      fullname: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    });
  };

  const handleEdit = (item) => {
    setUser(item);
    setAction("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUser((prev) => ({ ...prev, id }));
    setAction("delete");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAction("");
    setUser({});
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...user,
    };

    try {
      if (action === "add") {
        await request.post("/account/register", formData);
        handleClose();
        setReload(!reload);
      } else if (action === "edit") {
        await request.put("/account/update", formData);
        handleClose();
        setReload(!reload);
      } else if (action === "delete") {
        await request.delete("/account/delete", {
          params: {
            id: formData.id,
          },
        });
        setData((prev) => prev.filter((item) => item.id !== formData.id));
        handleClose();
      }
    } catch (error) {
      setError("Có lỗi đã xảy ra");
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex justify-between items-center">
        <nav>
          <ul className="flex gap-x-3 items-center">
            <li className="text-gray33 opacity-50 font-extralight text-base">
              <Link to={routes.dashboard}>Home</Link>
            </li>
            <li>/</li>
            <li className="font-extralight text-base">
              <Link to={routes.users}>Users</Link>
            </li>
          </ul>
          <ul>
            <li className="text-2xl font-bold">
              <Link to={routes.users}>Users</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button
            onClick={handleAdd}
            type="button"
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 uppercase"
          >
            Add User
          </button>
        </div>
      </div>
      <div className="py-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Our Categories
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
                  Username
                </th>
                <th scope="col" className="px-8 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                    >
                      {item.fullname}
                    </th>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">{item.username}</td>
                    <td className="p6-6 py-4">
                      <div className="flex">
                        {item.role === "admin" ? (
                          <p className="min-w-[110px] text-center py-1 bg-green-500 rounded-full text-white uppercase">
                            {item.role}
                          </p>
                        ) : (
                          <p className="min-w-[110px] text-center py-1 bg-gray-500 rounded-full text-white uppercase">
                            {item.role}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.created}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600"
                        >
                          <ion-icon
                            class="size-6 md hydrated"
                            name="create-outline"
                            role="img"
                          ></ion-icon>
                        </button>
                        <span>|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600"
                        >
                          <ion-icon
                            class="size-6 md hydrated"
                            name="trash-outline"
                            role="img"
                          ></ion-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="uppercase text-2xl font-bold text-center text-gray484 py-20"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full md:ml-72 max-w-md md:max-w-screen-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {action === "add" || action === "edit" ? (
                <>
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Edit Category
                    </h3>
                    <button
                      onClick={handleClose}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <form
                    className="p-4 md:p-5 max-h-[500px] overflow-y-auto"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 md:col-span-1">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          value={user.fullname || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Full Name"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Phone"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="Username"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={user.username || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Username"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={user.password || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="password"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={user.email || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="email"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Role
                        </label>
                        <select
                          id="Role"
                          name="role"
                          defaultValue={user.role}
                          onChange={handleChange}
                          className={`${
                            user.Role === "admin"
                              ? "text-green-500"
                              : "text-gray-500"
                          } w-full border border-black bg-white text-sm rounded-lg p-2.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none`}
                          required=""
                        >
                          <option className="select-none" value="" disabled>
                            Choose a Role
                          </option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                      {error && (
                        <p className="text-xs font-light text-red-500">
                          {error}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-blue287 hover:text-white hover:bg-blue287 border border-blue287 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Modal body */}
                  <form
                    className="py-8 max-h-[500px] overflow-y-auto"
                    onSubmit={handleSubmit}
                  >
                    <div className="text-center">
                      <ion-icon
                        class="size-16 text-red-500"
                        name="alert-circle-outline"
                      ></ion-icon>
                      <h1 className="mt-2 text-lg font-medium text-black">
                        Bạn có muốn xóa danh mục này không?
                      </h1>
                    </div>
                    <div className="flex gap-x-20 justify-center mt-12">
                      <button
                        type="submit"
                        className="min-w-[130px] text-white border border-red-500 bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase hover:bg-red-700 transition-all ease-in-out"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleClose}
                        className="min-w-[130px] text-black border border-graye8e font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase hover:bg-graye8e hover:text-blue287 transition-all ease-in-out"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Users;
