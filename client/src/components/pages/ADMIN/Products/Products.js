import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import routes from "../../../../config/routes";
import request from "../../../../utils/request";
import config from "../../../../utils/config";
function Products() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    pricesale: "",
    category_name: "",
    status: "Online",
    images: [],
  });
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("/products", {
          params: {
            page,
            limit: 5,
          },
        });
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, reload]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [reload]);

  const handleAdd = () => {
    setIsModalOpen(true);
    setAction("add");
    setProduct({
      name: "",
      description: "",
      stock: "",
      price: "",
      pricesale: "",
      category_name: "",
      status: "Online",
      images: [],
    });
  };

  const handleEdit = (item) => {
    setProduct(item);
    setAction("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProduct((prev) => ({ ...prev, id }));
    setAction("delete");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAction("");
    setProduct({});
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImages(previews);
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category_name", product.category_name);
    formData.append("price", product.price);
    formData.append("pricesale", product.pricesale);
    formData.append("stock", product.stock);
    formData.append("status", product.status);

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      if (action === "add") {
        await request.post("/addProducts", formData);
        handleClose();
        setReload(!reload);
      } else if (action === "edit") {
        await request.put(`/editProducts/${product.id}`, formData);
        handleClose();
        setReload(!reload);
      } else if (action === "delete") {
        await request.delete("/deleteProducts", {
          params: {
            id: product.id,
          },
        });
        setData((prev) => prev.filter((item) => item.id !== product.id));
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
              <Link to={routes.products}>Products</Link>
            </li>
          </ul>
          <ul>
            <li className="text-2xl font-bold">
              <Link to={routes.products}>Products</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button
            onClick={handleAdd}
            type="button"
            className="border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800 uppercase"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="py-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Our Products
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  PriceSale
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => {
                  let images = [];
                  try {
                    images = JSON.parse(item.images);
                  } catch (e) {
                    console.error("Failed to parse images:", e);
                  }
                  return (
                    <tr key={item.id} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4">
                        <div className="size-10">
                          <img
                            className="w-full h-full object-contain"
                            src={`${config.UPLOAD_URL}/${images[0]}`}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.category_name}</td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.pricesale)}
                      </td>
                      <td className="px-6 py-4">
                        {item.stock > 0 ? (
                          <span>{item.stock}</span>
                        ) : (
                          <span className="text-red-500">{item.stock}</span>
                        )}
                      </td>
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
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="uppercase text-2xl font-bold text-center text-gray484 py-20"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center py-6">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous Page Link */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                page === 1 ? "cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <ion-icon
                name="chevron-back-outline"
                role="img"
                className="md hydrated"
              ></ion-icon>
            </button>

            {/* Page Number Links */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === index + 1
                    ? "bg-blue287 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Page Link */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                page === totalPages ? "cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <ion-icon
                name="chevron-forward-outline"
                role="img"
                className="md hydrated"
              ></ion-icon>
            </button>
          </nav>
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
                      {action === "add" ? "Add Product" : "Edit Product"}
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
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={product.name || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Full Name"
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
                        <input
                          type="text"
                          name="description"
                          value={product.description || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray484 text-sm rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Phone"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="images"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Image
                        </label>
                        <input
                          className="w-full border border-black bg-white text-gray-500 text-sm rounded-lg p-1.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          multiple
                          type="file"
                          name="images"
                          onChange={handleFileChange}
                          required={action === "add"}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="category_name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Category Name
                        </label>
                        <select
                          id="category_name"
                          name="category_name"
                          defaultValue={product.category_name}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray-500 text-sm rounded-lg p-2.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          required=""
                        >
                          <option className="select-none" value="" disabled>
                            Choose a Category
                          </option>
                          {categories.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="stock"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={product.stock || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Quantity"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={product.price || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Price"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label
                          htmlFor="pricesale"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Price Sale
                        </label>
                        <input
                          type="number"
                          name="pricesale"
                          value={product.pricesale || ""}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-black text-sm font-medium rounded-lg p-2 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          placeholder="Price Sale"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-center gap-x-10">
                          {images.map((item) => (
                            <img
                              key={item}
                              className="w-40 h-40 object-cover"
                              src={item}
                              alt=""
                            />
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={product.status}
                          onChange={handleChange}
                          className="w-full border border-black bg-white text-gray-500 text-sm rounded-lg p-2.5 focus:ring-blue287 focus:border focus:border-blue287 focus:outline-none"
                          required=""
                        >
                          <option className="select-none" value="" disabled>
                            Choose a status
                          </option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
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

export default Products;
