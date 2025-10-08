import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../../../Context/CartContext";
import request from "../../../../utils/request";
import config from "../../../../utils/config";

function Shop() {
  const { addToCart, cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [productsNew, setProductsNew] = useState([]);
  const [type, setType] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showAlertSuccess, setShowAlertSucces] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;

    if (newQuantity > product.stock) {
      setShowAlertError(true);
      setTimeout(() => {
        setShowAlertError(false);
      }, 1200);
    } else {
      addToCart(product);
      setShowAlertSucces(true);
      setTimeout(() => {
        setShowAlertSucces(false);
      }, 1200);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await request.get("/products", {
          params: {
            page,
            limit: 6,
          },
        });
        setProducts((prevProducts) => {
          const newProducts = res.data.data.filter(
            (newProduct) =>
              !prevProducts.some((product) => product.id === newProduct.id)
          );
          return [...prevProducts, ...newProducts];
        });
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request.get("/categories");
        setType(["All", ...res.data.map((category) => category.name)]); // Add 'All' before other categories
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsNew = async () => {
      try {
        const res = await request.get("/productsNew");
        setProductsNew(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsNew();
  }, []);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredProducts =
    selectedFilter === "All"
      ? products
      : products.filter((product) => product.category_name === selectedFilter);

  return (
    <div className="pt-20 md:pt-28">
      {/* Alert */}
      {showAlertSuccess && (
        <div
          role="alert"
          className={`fixed top-32 right-3 z-50 transition-transform transform ${
            showAlertSuccess ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
            Thành Công
          </div>
          <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
            <p>Sản phẩm được thêm thành công</p>
          </div>
        </div>
      )}
      {showAlertError && (
        <div
          role="alert"
          className={`fixed top-32 right-3 z-50 transition-transform transform ${
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
      {/* Products */}
      <section className="py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center mb-4 md:mb-8">
          Thực Đơn
        </h2>
        {/* Filter Button Mobile*/}
        <div className="flex md:hidden flex-wrap justify-center md:flex-nowrap md:justify-between text-center max-w-defaultWidthLayout mx-auto mb-6">
          {type.map((item, index) => (
            <button
              key={index}
              className={`uppercase text-xl px-4 py-2 font-medium hover:text-rede31 transition-all ease-in-out border-b-2 ${
                selectedFilter === item
                  ? "text-rede31 border-rede31"
                  : "border-transparent"
              }`}
              data-type={item}
              onClick={() => setSelectedFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex justify-between max-w-defaultWidthLayout mx-auto">
          <div className="w-full md:w-[calc(100%-384px)] grid grid-cols-1 md:grid-cols-3 gap-4 max-w-defaultWidthLayout mx-auto">
            {/* Product Item */}
            {filteredProducts.map((item) => {
              let images = [];
              try {
                images = JSON.parse(item.images);
              } catch (e) {
                console.error("Failed to parse images:", e);
              }
              return (
                <div key={item.id} className="px-3 md:px-0">
                  <div
                    id="Product-item"
                    data-type="Burger"
                    className="group relative w-full overflow-hidden rounded-lg bg-white shadow-md border transition-all ease-in-out"
                  >
                    <Link to={`/product/${item.slug}/${item.id}`}>
                      <img
                        className="h-60 mx-auto rounded-t-lg object-cover transition-all ease-in-out group-hover:scale-110"
                        src={`${config.UPLOAD_URL}/${images[0]}`}
                        alt="product"
                      />
                    </Link>
                    <div className="mt-4 px-5 pb-5">
                      <Link to={`/product/${item.slug}/${item.id}`}>
                        <h5 className="text-center text-xl font-semibold tracking-tight text-black h-7 line-clamp-1">
                          {item.name}
                        </h5>
                      </Link>
                      <p className="text-center text-sm font-normal tracking-tight text-gray484 mt-1 h-10 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex justify-center items-center">
                        <span className="mr-2 rounded bg-yellow-400 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                        <div className="flex items-center justify-center text-yellow-400">
                          <ion-icon
                            name="star"
                            role="img"
                            class="md hydrated"
                          ></ion-icon>
                          <ion-icon
                            name="star"
                            role="img"
                            class="md hydrated"
                          ></ion-icon>
                          <ion-icon
                            name="star"
                            role="img"
                            class="md hydrated"
                          ></ion-icon>
                          <ion-icon
                            name="star"
                            role="img"
                            class="md hydrated"
                          ></ion-icon>
                          <ion-icon
                            name="star"
                            role="img"
                            class="md hydrated"
                          ></ion-icon>
                        </div>
                      </div>
                      <div className="flex px-4 md:px-0 items-center justify-between mt-5">
                        <p>
                          <span className="text-base font-bold text-black mr-1">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </span>
                          <span className="text-xs text-gray484 line-through">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.pricesale)}
                          </span>
                        </p>
                        <input type="hidden" name="id" id="id" value="32" />
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center rounded-md bg-rede31 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-opacity-80 transition-all ease-in-out"
                        >
                          <ion-icon
                            class="size-6 md hydrated"
                            name="cart-outline"
                            role="img"
                          ></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-96 ml-6 hidden md:block">
            <div className="py-2 px-8 border rounded-md">
              <div>
                <h2 className="text-2xl font-bold tracking-widest text-center uppercase leading-10">
                  Danh Mục Sản Phẩm
                </h2>
                <ul className="flex flex-col py-6">
                  {type.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <button
                        className={`uppercase text-xl px-4 py-2 font-medium hover:text-rede31 transition-all ease-in-out ${
                          selectedFilter === item ? "text-rede31" : ""
                        }`}
                        data-type={item}
                        onClick={() => setSelectedFilter(item)}
                      >
                        {item}
                      </button>
                      <ion-icon
                        class="w-6 h-6 md hydrated"
                        name="caret-forward-outline"
                        role="img"
                      ></ion-icon>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="py-3 px-8 border rounded-md mt-5">
              <div>
                <h2 className="text-2xl font-bold tracking-widest text-center uppercase">
                  Sản Phẩm Mới
                </h2>
                <ul className="flex flex-col gap-y-4 py-6 h-[400px] overflow-y-scroll">
                  {productsNew.map((item) => {
                    let images = [];
                    try {
                      images = JSON.parse(item.images);
                    } catch (e) {
                      console.error("Failed to parse images:", e);
                    }
                    return (
                      <Link
                        to={`/product/${item.slug}/${item.id}`}
                        key={item.id}
                      >
                        <li className="flex items-center gap-x-3">
                          {/* <!-- Left --> */}
                          <div className="p-1 border">
                            <img
                              className="w-24 h-24 object-contain"
                              src={`${config.UPLOAD_URL}/${images[0]}`}
                              alt=""
                            />
                          </div>
                          {/* <!-- Right --> */}
                          <div>
                            {/* <!-- Star icon --> */}
                            <div className="mt-2.5 flex items-center">
                              <span className="mr-2 rounded bg-yellowffc px-2.5 py-0.5 text-xs font-semibold">
                                5.0
                              </span>
                              <div className="flex items-center justify-center text-yellowffc">
                                <ion-icon
                                  name="star"
                                  role="img"
                                  class="md hydrated"
                                ></ion-icon>
                                <ion-icon
                                  name="star"
                                  role="img"
                                  class="md hydrated"
                                ></ion-icon>
                                <ion-icon
                                  name="star"
                                  role="img"
                                  class="md hydrated"
                                ></ion-icon>
                                <ion-icon
                                  name="star"
                                  role="img"
                                  class="md hydrated"
                                ></ion-icon>
                                <ion-icon
                                  name="star"
                                  role="img"
                                  class="md hydrated"
                                ></ion-icon>
                              </div>
                            </div>
                            {/* <!-- Title --> */}
                            <div>
                              <h2 className="text-black text-base font-semibold mt-1">
                                {item.name}
                              </h2>
                            </div>
                            {/* <!-- Price --> */}
                            <div className="flex items-center gap-x-2 text-green9f font-bold">
                              <p className="text-lg text-rede31">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </p>
                              <p className="text-rede31 text-opacity-70 text-sm line-through">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.pricesale)}
                              </p>
                            </div>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {page < totalPages ? (
          <div className="flex justify-center w-full md:w-[calc(100%-384px)] mt-4">
            <button
              onClick={handleLoadMore}
              className="uppercase text-lg font-bold text-white bg-rede31 min-w-[180px] py-3 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out"
            >
              Xem Thêm
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              className="uppercase text-lg font-bold text-white bg-rede31 min-w-[180px] py-3 px-4 rounded-lg border border-rede31 transition-all ease-in-out hover:cursor-not-allowed"
              disabled
            >
              Đã Hết Sản Phẩm
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
