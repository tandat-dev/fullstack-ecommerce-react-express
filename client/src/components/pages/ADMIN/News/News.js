import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import routes from "../../../../config/routes";
import request from "../../../../utils/request";
import config from "../../../../utils/config";
function News() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [news, setNews] = useState({
    title: "",
    description: "",
    content: "",
    status: "Online",
    image: "",
  });

  console.log(news);

  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("/news");
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
    setNews({
      title: "",
      description: "",
      content: "",
      status: "Online",
      image: null,
    });
  };

  const handleEdit = (item) => {
    setNews(item);
    setAction("edit");
    setIsModalOpen(true);
    setImage(`${config.UPLOAD_URL}/${item.image}`);
    console.log(image);
  };

  const handleDelete = (id) => {
    setNews((prev) => ({ ...prev, id }));
    setAction("delete");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNews((prev) => ({
      ...prev,
      image: file,
    }));
    const render = new FileReader();
    render.onloadend = () => {
      setImage(render.result);
    };
    if (file) {
      render.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAction("");
    setNews({});
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("content", news.content);
    formData.append("status", news.status);
    formData.append("image", news.image || Image);

    try {
      if (action === "add") {
        await request.post("/addNews", formData);
        setReload(!reload);
        handleClose();
      } else if (action === "edit") {
        await request.put("/editContacts", formData);
        handleClose();
        setReload(!reload);
      } else if (action === "delete") {
        await request.delete("/deleteNews", {
          params: { id: news.id },
        });
        setData((prev) => prev.filter((item) => item.id !== news.id));
        handleClose();
      }
    } catch (error) {
      setError("Có lỗi đã xảy ra");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              <Link to={routes.news}>News</Link>
            </li>
          </ul>
          <ul>
            <li className="text-2xl font-bold">
              <Link to={routes.news}>News</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button
            onClick={handleAdd}
            type="button"
            class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 uppercase"
          >
            Add News
          </button>
        </div>
      </div>
      <div className="py-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Our News
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
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
                    <td className="px-6 py-4">
                      <div className="size-10">
                        <img
                          className="w-full h-full object-contain"
                          src={`${config.UPLOAD_URL}/${item.image}` || ""}
                          alt=""
                        />
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="max-w-[300px] px-6 py-4 font-medium text-gray-900 uppercase whitespace-normal"
                    >
                      <p className="line-clamp-2">{item.title}</p>
                    </th>
                    <td className="px-6 py-4 max-w-[350px]">
                      <p className="line-clamp-2">{item.description}</p>
                    </td>
                    <td className="p6-6 py-4">
                      <div className="flex">
                        {item.status === "Online" ? (
                          <p className="min-w-[110px] text-center py-1 bg-green-500 rounded-full text-white uppercase">
                            {item.status}
                          </p>
                        ) : (
                          <p className="min-w-[110px] text-center py-1 bg-red-500 rounded-full text-white uppercase">
                            {item.status}
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
              {action === "edit" || action === "add" ? (
                <>
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {action === "edit" ? "Edit News" : "Add News"}
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
                    encType="multipart/form-data"
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={news.title || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Title"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          defaultValue={news.description || ""}
                          rows={3}
                          onChange={handleChange}
                          placeholder="Description"
                          name="description"
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="content"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Content
                        </label>
                        <textarea
                          defaultValue={news.content || ""}
                          rows={8}
                          onChange={handleChange}
                          placeholder="Content"
                          name="content"
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="col-span-2  md:col-span-1">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          defaultValue={news.status}
                          onChange={handleChange}
                          className={`${
                            news.status === "Online"
                              ? "text-green-500"
                              : "text-red-500"
                          } w-full border border-black bg-white text-sm rounded-lg p-2.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none`}
                          required=""
                        >
                          <option className="select-none" value="" disabled>
                            Choose a status
                          </option>
                          <option
                            value="Online"
                            className={
                              news.status === "Online"
                                ? "text-green-500"
                                : "text-black"
                            }
                          >
                            Online
                          </option>
                          <option
                            value="Offline"
                            className={
                              news.status === "Offline"
                                ? "text-red-500"
                                : "text-black"
                            }
                          >
                            Offline
                          </option>
                        </select>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="image"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Image
                        </label>
                        <input
                          className="w-full border border-black bg-white text-gray-500 text-sm rounded-lg p-1.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          required={action === "add"}
                        />
                      </div>
                      <div className="col-span-2">
                        {image && (
                          <img
                            className="w-full h-[250px] object-contain"
                            src={image}
                            alt="image-category"
                          />
                        )}
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

export default News;
