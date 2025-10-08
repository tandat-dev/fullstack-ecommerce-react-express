import Slider from "react-slick";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../../../Context/CartContext";
import request from "../../../../utils/request";
import config from "../../../../utils/config";
function Home() {
  const { addToCart, cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
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
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 1200);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request.get("/categories");
        setCategories(res.data);
        setType(["All", ...res.data.map((category) => category.name)]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await request.get("/products", {
          params: {
            page,
            limit: 8,
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
    const fetchNews = async () => {
      try {
        const res = await request.get("/news");
        setNews(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
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
  const settingsBanner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsCategories = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="pt-20 md:pt-28">
      {/* Alert */}
      {showAlertSuccess && (
        <div
          role="alert"
          className={`fixed top-24 md:top-32 right-3 z-50 transition-transform transform ${
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
      {/* Slider */}
      <div id="listBanner">
        <Slider {...settingsBanner}>
          <div className="w-full h-[160px] md:h-[calc(100vh-112px)] bg-red-500 flex items-center justify-center focus:outline-none">
            <img
              className="w-full h-full object-cover"
              src={require("../../../../assets/images/slider1.png")}
              alt="slider1"
            />
          </div>
          <div className="w-full h-[160px] md:h-[calc(100vh-112px)] bg-blue-500 flex items-center justify-center focus:outline-none">
            <img
              className="w-full h-full object-cover"
              src={require("../../../../assets/images/slider2.png")}
              alt="slider2"
            />
          </div>
          <div className="w-full h-[160px] md:h-[calc(100vh-112px)] bg-green-500 flex items-center justify-center focus:outline-none">
            <img
              className="w-full h-full object-cover"
              src={require("../../../../assets/images/slider3.png")}
              alt="slider3"
            />
          </div>
          <div className="w-full h-[160px] md:h-[calc(100vh-112px)] bg-yellow-500 flex items-center justify-center focus:outline-none">
            <img
              className="w-full h-full object-cover"
              src={require("../../../../assets/images/slider4.png")}
              alt="slider4"
            />
          </div>
        </Slider>
      </div>
      {/* List Categories */}
      <section className="py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center mb-4 md:mb-8">
          Danh Mục
        </h2>

        <div className="flex flex-col md:flex-row w-full h-auto md:h-[425px]">
          <div className="w-full md:w-1/4 h-full bg-rede31 py-4 md:py-0">
            <div className="max-w-[234px] m-auto text-center">
              {/* Logo */}
              <div className="size-32 mx-auto">
                <img
                  className="size-full object-contain"
                  src={require("../../../../assets/images/logo.png")}
                  alt="logo"
                />
              </div>
              {/* Title */}
              <div>
                <h1 className="uppercase text-5xl text-white font-bold leading-normal">
                  Ăn Gì Hôm Nay
                </h1>
              </div>
              {/* Description */}
              <div>
                <p className="text-base text-white font-light">
                  Thực đơn của chúng tôi đa dạng và phong phú, có rất nhiều sự
                  lựa chọn cho bạn, gia đình và bạn bè.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-[445px] md:w-3/4 md:h-[425px] md:border shadow-sm bg-white">
            <div id="listCategories" className="w-full h-full">
              <Slider {...settingsCategories}>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="w-full h-[445px] md:h-[425px] border md:border-r overflow-hidden"
                  >
                    <div className="md:translate-y-24 transition-all ease-in md:hover:translate-y-0">
                      <img
                        className="object-contain w-[385px] h-[315px] flex mx-auto"
                        src={config.UPLOAD_URL + "/" + category.image}
                        alt="logo"
                      />
                      <div className="px-6">
                        <div className="bg-rede31 py-5 md:py-10 rounded-md md:rounded-t-md">
                          <h2 className="uppercase text-2xl text-white text-center font-bold">
                            {category.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* Products */}
      <section className="py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center mb-4 md:mb-8">
          Thực Đơn
        </h2>
        {/* Filter Button */}
        <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between text-center max-w-defaultWidthLayout mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-defaultWidthLayout mx-auto mt-4">
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
                  className="group relative w-full overflow-hidden rounded-lg bg-white shadow-md border transition-all duration-1000 ease-in-out"
                >
                  <Link to={`/product/detailProduct/${item.id}`}>
                    <img
                      className="h-60 mx-auto rounded-t-lg object-cover transition-all ease-in-out group-hover:scale-110"
                      src={`${config.UPLOAD_URL}/${images[0]}`}
                      alt="product"
                    />
                  </Link>
                  <div className="mt-4 px-5 pb-5">
                    <Link to={`/product/detailProduct/${item.id}`}>
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
                        <span className="text-xl font-bold text-black mr-1">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </span>
                        <span className="text-sm text-gray484 line-through">
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
        {page < totalPages ? (
          <div className="flex justify-center mt-4">
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
      {/* Service */}
      <section className="py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center">Dịch Vụ</h2>
        <p className="uppercase text-gray484 text-center text-base font-semibold mt-3">
          Tận hưởng những dịch vụ tốt nhất từ chúng tôi
        </p>
        <hr className="w-[300px] md:w-[450px] h-1 bg-rede31 border-none mx-auto mt-3 mb-4 md:mb-8" />
        <div className="max-w-defaultWidthLayout  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="group">
              <img
                className="w-full h-[315px] object-contain group-hover:rotate-[360deg] transition-all duration-500 ease-in-out"
                src={require("../../../../assets/images/laytaicuahang.png")}
                alt="dichvu1"
              />
              <h1 className="uppercase text-2xl font-bold text-center mt-3">
                Lấy tại cửa hàng
              </h1>
            </div>
            <div className="group">
              <img
                className="w-full h-[315px] object-contain group-hover:rotate-[360deg] transition-all duration-500 ease-in-out"
                src={require("../../../../assets/images/tiecsinhnhat.png")}
                alt="dichvu1"
              />
              <h1 className="uppercase text-2xl font-bold text-center mt-3">
                Đặt tiệc sinh nhật
              </h1>
            </div>
            <div className="group">
              <img
                className="w-full h-[315px] object-contain group-hover:rotate-[360deg] transition-all duration-500 ease-in-out"
                src={require("../../../../assets/images/kidclub.png")}
                alt="dichvu1"
              />
              <h1 className="uppercase text-2xl font-bold text-center mt-3">
                Lấy tại cửa hàng
              </h1>
            </div>
            <div className="group">
              <img
                className="w-full h-[315px] object-contain group-hover:rotate-[360deg] transition-all duration-500 ease-in-out"
                src={require("../../../../assets/images/donhanglon.png")}
                alt="dichvu1"
              />
              <h1 className="uppercase text-2xl font-bold text-center mt-3">
                Đơn hàng lớn
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* News */}
      <section className="py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center mb-4 md:mb-8">
          Tin Tức
        </h2>
        <div className="max-w-defaultWidthLayout  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {news.map((item) => (
              <div key={item.id} className="px-3 md:px-0">
                <div className="py-4 md:p-2 border rounded-sm">
                  <img
                    className="w-full h-[175px] rounded object-contain"
                    src={`${config.UPLOAD_URL}/${item.image}` || ""}
                    alt="tintuc1"
                  />
                  <h1 className="text-xl uppercase font-semibold text-black line-clamp-2 h-[50px] mt-2">
                    {item.title}
                  </h1>
                  <p className="text-sm font-normal text-gray484 h-10 line-clamp-2 mt-2">
                    {item.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={require("../../../../assets/images/memberMale.png")}
                      alt="member"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-rede31">
                        Fast Food
                      </p>
                      <p className="text-sm text-gray484">{item.created}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/new">
              <button className="uppercase text-lg font-bold text-white bg-rede31 min-w-[180px] py-3 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out">
                Xem thêm
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
