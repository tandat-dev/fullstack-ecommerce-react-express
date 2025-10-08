import React from "react";
import Slider from "react-slick";

function About() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
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
      <div className="w-full md:h-[500px] h-[200px] flex items-center justify-center relative">
        <img
          className="w-full h-full object-cover"
          src={require("../../../../assets/images/aboutBanner.png")}
          alt="aboutBanner"
        />
        <h1 className="uppercase absolute text-rede31 text-3xl md:text-5xl font-bold">
          Về chúng tôi
        </h1>
      </div>
      {/* About */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6 px-3 md:px-0">
        <div className="flex flex-col md:flex-row items-center gap-x-8">
          <div className="hidden md:block md:w-2/5">
            <img
              className="w-full md:h-[300px] object-contain rounded"
              src={require("../../../../assets/images/aboutBanner.png")}
              alt=""
            />
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl text-rede31 font-Miniver font-bold">
              FastFood
            </h2>
            <p className="text-base text-gray484 font-normal mt-2">
              Nhóm chúng tôi được thành lập với mục tiêu nâng cao chất lượng và
              đổi mới trong ngành fast food. Chúng tôi cam kết mang đến những
              món ăn ngon miệng và bổ dưỡng, đồng thời tạo ra những trải nghiệm
              ẩm thực độc đáo cho khách hàng. Với tinh thần sáng tạo và khát
              khao hoàn thiện, chúng tôi luôn tìm kiếm những giải pháp tiên tiến
              để tối ưu hóa quy trình phục vụ, đảm bảo sự hài lòng tuyệt đối của
              khách hàng. FastFood sẽ trở thành điểm đến lý tưởng cho những ai
              yêu thích ẩm thực nhanh và chất lượng.
            </p>
            <button className="uppercase text-lg font-bold text-white bg-rede31 min-w-[150px] py-2 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out mt-8">
              Xem thêm
            </button>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6 px-3 md:px-0">
        <h2 className="uppercase text-rede31 text-4xl font-bold text-center">
          Vì sao chọn chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
            <ion-icon
              class="size-20 text-rede31 md hydrated"
              name="shield-checkmark-outline"
              role="img"
            ></ion-icon>
            <h2 className="text-2xl font-semibold">An toàn</h2>
            <p className="text-base font-light text-gray4f px-3 text-center">
              Chúng tôi cam kết đặt an toàn thực phẩm lên hàng đầu, đảm bảo mọi
              nguyên liệu đều được kiểm tra kỹ lưỡng và tuân thủ tiêu chuẩn vệ
              sinh nghiêm ngặt. Quy trình chế biến của chúng tôi luôn được giám
              sát chặt chẽ, mang đến cho khách hàng những bữa ăn không chỉ ngon
              miệng mà còn an toàn tuyệt đối.
            </p>
          </div>
          <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
            <ion-icon
              class="size-20 text-rede31 md hydrated"
              name="heart-outline"
              role="img"
            ></ion-icon>
            <h2 className="text-2xl font-semibold">Chất lượng</h2>
            <p className="text-base font-light text-gray4f px-3 text-center">
              Chúng tôi tự hào mang đến những món ăn nhanh không chỉ ngon miệng
              mà còn đầy sáng tạo, với chất lượng nguyên liệu tươi ngon và công
              thức chế biến độc quyền, mang đến trải nghiệm ẩm thực tuyệt vời
              cho mọi khách hàng.{" "}
            </p>
          </div>
          <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
            <ion-icon
              class="size-20 text-rede31 md hydrated"
              name="storefront-outline"
              role="img"
            ></ion-icon>
            <h2 className="text-2xl font-semibold">Cửa hàng</h2>
            <p className="text-base font-light text-gray4f px-3 text-center">
              Cửa hàng của chúng tôi là điểm đến lý tưởng, với sự hiện diện rộng
              rãi tại hầu hết mọi nơi, đảm bảo mang đến sự tiện lợi và chất
              lượng dịch vụ đồng nhất cho tất cả khách hàng.{" "}
            </p>
          </div>
        </div>
      </section>
      {/* Our Team */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6 px-3 md:px-0">
        <h2 className="uppercase text-rede31 text-4xl font-bold text-center">
          Đội ngũ của chúng tôi
        </h2>
        <div id="listTeamMember" className="py-8">
          <Slider {...settings}>
            <div className="md:px-3">
              <div className="flex flex-col items-center py-4 border border-graye8e rounded shadow-sm">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={require("../../../../assets/images/memberMale.png")}
                  alt="Team Member 1"
                />
                <h3 className="text-xl font-bold mt-4">Ông: Nguyễn Văn A</h3>
                <p className="text-center text-gray484">Giám đốc điều hành</p>
              </div>
            </div>
            <div className="md:px-3">
              <div className="flex flex-col items-center py-4 border border-graye8e rounded shadow-sm">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={require("../../../../assets/images/memberFamale.png")}
                  alt="Team Member 2"
                />
                <h3 className="text-xl font-bold mt-4">Bà: Trần Thị B</h3>
                <p className="text-center text-gray484">
                  Trưởng phòng Marketing
                </p>
              </div>
            </div>
            <div className="md:px-3">
              <div className="flex flex-col items-center py-4 border border-graye8e rounded shadow-sm">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={require("../../../../assets/images/memberMale.png")}
                  alt="Team Member 3"
                />
                <h3 className="text-xl font-bold mt-4">Ông: Lê Văn C</h3>
                <p className="text-center text-gray484">
                  Trưởng phòng Kinh doanh
                </p>
              </div>
            </div>
            <div className="md:px-3">
              <div className="flex flex-col items-center py-4 border border-graye8e rounded shadow-sm">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={require("../../../../assets/images/memberMale.png")}
                  alt="Team Member 3"
                />
                <h3 className="text-xl font-bold mt-4">Ông: Phan Văn D</h3>
                <p className="text-center text-gray484">
                  Trưởng phòng Kỹ thuật
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* Contact Information */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6">
        <h2 className="uppercase text-rede31 text-4xl font-bold text-center mb-4 md:mb-8">
          Liên hệ
        </h2>
        <div className="px-3 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
              <ion-icon
                class="size-20 text-rede31 md hydrated"
                name="mail-unread-outline"
                role="img"
                aria-label="mail unread outline"
              ></ion-icon>
              <h2 className="text-2xl font-semibold">Email</h2>
              <p className="text-base font-light text-gray4f">
                fastfood@gmail.com
              </p>
            </div>
            <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
              <ion-icon
                class="size-20 text-rede31 md hydrated"
                name="call-outline"
                role="img"
                aria-label="call outline"
              ></ion-icon>
              <h2 className="text-2xl font-semibold">Điện Thoại</h2>
              <p className="text-base font-light text-gray4f">0987.654.321</p>
            </div>
            <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
              <ion-icon
                class="size-20 text-rede31 md hydrated"
                name="location-outline"
                role="img"
                aria-label="location outline"
              ></ion-icon>
              <h2 className="text-2xl font-semibold">Địa Chỉ</h2>
              <p className="text-base font-light text-gray4f">
                331 QL1A, An Phú Đông, Quận 12
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
