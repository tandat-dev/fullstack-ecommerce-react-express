import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { CartContext } from "../../../../Context/CartContext";
import request from "../../../../utils/request";
import config from "../../../../utils/config";

function DetailProduct() {
  const { addToCart, cart } = useContext(CartContext);
  const { alias, id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await request.get(`/products/${alias}/${id}`);
        const productData = res.data;
        productData.images = Array.isArray(productData.images)
          ? productData.images
          : JSON.parse(productData.images);
        setProduct(productData);
        setSelectedImage(`${config.UPLOAD_URL}/${productData.images[0]}`); // Set initial selected image
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [alias, id]);

  const handleClick = (image, index) => {
    setSelectedImage(`${config.UPLOAD_URL}/${image}`);
    setActiveIndex(index);
  };

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

  if (!product) {
    return <div>Loading...</div>;
  }

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
      <section className="container max-w-defaultWidthLayout mx-auto py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* <!-- Col1 --> */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* <!-- ListIMG --> */}
            <ul className="flex flex-row w-[390px] md:w-auto md:flex-col py-4 md:py-0 md:pr-2 gap-y-3 h-auto md:h-[390px] overflow-y-hidden overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll order-2 md:order-1">
              {product.images.length > 1 ? (
                product.images.map((image, index) => (
                  <li
                    key={index}
                    className={`flex shrink-0 border transition-all ${
                      activeIndex === index ? "border-rede31" : "border-graye8e"
                    }`}
                    onClick={() => handleClick(image, index)}
                  >
                    <img
                      className="size-24 object-contain cursor-pointer"
                      src={`${config.UPLOAD_URL}/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </li>
                ))
              ) : (
                <li
                  className={`flex shrink-0 border transition-all ${
                    activeIndex === 0 ? "border-rede31" : "border-graye8e"
                  }`}
                >
                  <img
                    className="size-24 object-contain cursor-pointer"
                    src={`${config.UPLOAD_URL}/${product.images[0]}`}
                    alt="Thumbnail"
                  />
                </li>
              )}
            </ul>
            {/* <!-- Thump --> */}
            <div className="w-full h-[390px] border shadow-sm bg-gray-100 rounded-sm order-1 md:order-2">
              <img
                id="thump"
                className="object-contain size-4/5 mx-auto transition-all"
                src={selectedImage}
                alt="Thumbnail"
              />
            </div>
          </div>
          {/* <!-- Col2 --> */}
          <div className="px-3 md:px-0">
            <input type="hidden" name="id" id="id" value={id} />
            <h2 className="text-3xl font-semibold font-Miniver text-rede31 tracking-widest">
              {product.category_name}
            </h2>
            <h1 className="text-black text-4xl font-bold mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <div className="flex items-center justify-center gap-x-1 text-yellowffc">
                <ion-icon name="star" role="img" class="md hydrated"></ion-icon>
                <ion-icon name="star" role="img" class="md hydrated"></ion-icon>
                <ion-icon name="star" role="img" class="md hydrated"></ion-icon>
                <ion-icon name="star" role="img" class="md hydrated"></ion-icon>
                <ion-icon name="star" role="img" class="md hydrated"></ion-icon>
              </div>
            </div>
            <p className="h-12 md:h-40 line-clamp-2 md:line-clamp-4">
              {product.description}
            </p>
            <div className="flex mt-6 items-center md:pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex">
              <span className="title-font font-semibold text-3xl text-black">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex ml-auto text-white text-base font-medium bg-rede31 border border-rede31 py-2 px-6 focus:outline-none transition-all ease-in-out rounded hover:bg-transparent hover:text-rede31"
              >
                Mua Ngay
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-rede31 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailProduct;
