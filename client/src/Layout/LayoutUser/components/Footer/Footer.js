import { Link } from "react-router-dom";
import routesConfig from "../../../../config";
function Footer() {
  return (
    <section className="container flex flex-col justify-center mx-auto bg-rede31">
      <div className=" py-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 w-full px-4 md:px-0 md:max-w-defaultWidthLayout">
          {/* <!-- Col-1 --> */}
          <div>
            {/* <!-- Logo --> */}
            <div className="flex flex-col">
              <div>
                <img
                  className="size-32 object-contain mx-auto md:mx-0"
                  src={require("../../../../assets/images/logo.png")}
                  alt=""
                />
              </div>
            </div>
            {/* <!-- Icon --> */}
            <div className="flex justify-center md:justify-normal gap-x-6 items-center mt-4">
              <Link className="hover:text-white transition-all" to="#">
                <ion-icon
                  class="size-8 md hydrated"
                  name="logo-facebook"
                  role="img"
                ></ion-icon>
              </Link>
              <Link className="hover:text-white transition-all" to="#">
                <ion-icon
                  class="size-8 md hydrated"
                  name="logo-instagram"
                  role="img"
                ></ion-icon>
              </Link>
              <Link className="hover:text-white transition-all" to="#">
                <ion-icon
                  class="size-8 md hydrated"
                  name="logo-youtube"
                  role="img"
                ></ion-icon>
              </Link>
              <Link className="hover:text-white transition-all" to="#">
                <ion-icon
                  class="size-8 md hydrated"
                  name="logo-twitter"
                  role="img"
                ></ion-icon>
              </Link>
            </div>
          </div>
          {/* <!-- Col-2 --> */}
          <div className="mt-6 md:mt-0">
            <h2 className="uppercase text-2xl font-bold text-white">
              Danh Mục
            </h2>
            {/* <!-- Nav --> */}
            <nav>
              <ul className="flex flex-col gap-y-3 mt-4">
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2" to={routesConfig.routes.home}>
                    Trang Chủ
                  </Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2" to={routesConfig.routes.shop}>
                    Thực Đơn
                  </Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2" to={routesConfig.routes.new}>
                    Tin Tức
                  </Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2" to={routesConfig.routes.about}>
                    Giới Thiệu
                  </Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2" to={routesConfig.routes.contact}>
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* <!-- Col-3 --> */}
          <div className="mt-6 md:mt-0">
            <h2 className="uppercase text-2xl font-bold text-white">Hỗ Trợ</h2>
            {/* <!-- Nav --> */}
            <nav>
              <ul className="flex flex-col gap-y-3 mt-4 gap-x-8">
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2">Hỗ Trợ</Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2">Điều Khoản</Link>
                </li>
                <li className="text-xl font-medium transition-all hover:text-white">
                  <Link className="py-4 px-2">Chính Sách</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* <!-- Col-4 --> */}
          <div className="mt-6 md:mt-0">
            <iframe
              title="Google Maps Location"
              className="w-full h-full rounded"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3652029854666!2d106.69204877480615!3d10.859802889294066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c17978287d%3A0xec48f5a17b7d5741!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBU4bqldCBUaMOgbmggLSBDxqEgc-G7nyBxdeG6rW4gMTI!5e0!3m2!1svi!2s!4v1720681513997!5m2!1svi!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white py-4 mt-8">
        <div className="bg-white flex items-center justify-between w-full max-w-defaultWidthLayout rounded-sm">
          <div className="hidden md:block">
            <Link to="/">
              <h2 className="text-3xl font-bold">FastFood</h2>
            </Link>
          </div>
          <div className="w-full md:w-auto">
            <h2 className="text-center md:text-start">
              Copyright © 2022 by FastFood. All Rights Reserved.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
