import { useState } from "react";

import request from "../../../../utils/request";
function Contact() {
  const [contact, setContact] = useState({
    fullname: "",
    phone: "",
    title: "",
    message: "",
    status: "Unresolved",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = async (e) => {
    setError("");
    setSuccess("");
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setContact({
      fullname: "",
      phone: "",
      title: "",
      message: "",
      status: "Unresolved",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...contact,
    };
    try {
      await request.post("/addContacts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess("Gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.");
      setError("");
      handleReset();
    } catch (error) {
      setError("Gửi thất bại. Có lỗi đã xảy ra");
      setSuccess("");
    }
  };

  return (
    <div className="pt-20 md:pt-28">
      <div className="w-full md:h-[390px] h-[200px] flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={require("../../../../assets/images/contactBanner.png")}
          alt="contactBanner"
        />
        <h1 className="uppercase absolute text-rede31 text-3xl md:text-5xl font-bold">
          Liên Hệ
        </h1>
      </div>
      {/* Address */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6">
        <div className="px-3 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
              <ion-icon
                class="size-20 text-rede31 md hydrated"
                name="mail-unread-outline"
                role="img"
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
              ></ion-icon>
              <h2 className="text-2xl font-semibold">Điện Thoại</h2>
              <p className="text-base font-light text-gray4f">0987.654.321</p>
            </div>
            <div className="flex flex-col gap-y-3 items-center border shadow-sm py-4 shadow-rede31">
              <ion-icon
                class="size-20 text-rede31 md hydrated"
                name="location-outline"
                role="img"
              ></ion-icon>
              <h2 className="text-2xl font-semibold">Địa Chỉ</h2>
              <p className="text-base font-light text-gray4f">
                331 QL1A, An Phú Đông, Quận 12
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Form Contact */}
      <section className="container max-w-defaultWidthLayout mx-auto py-6">
        <h2 className="text-rede31 text-5xl font-bold text-center mb-4 md:mb-8">
          Liên Hệ Với Chúng Tôi
        </h2>
        <div className="px-3 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <iframe
                title="Google Maps Location"
                className="w-full h-full rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3652029854666!2d106.69204877480615!3d10.859802889294066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c17978287d%3A0xec48f5a17b7d5741!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBU4bqldCBUaMOgbmggLSBDxqEgc-G7nyBxdeG6rW4gMTI!5e0!3m2!1svi!2s!4v1720081673887!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mx-auto w-full max-w-sm md:max-w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Họ và tên
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Nhập đầy đủ họ và tên"
                      tabIndex={1}
                      id="fullname"
                      name="fullname"
                      value={contact.fullname || ""}
                      onChange={handleChange}
                      type="text"
                      required
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Nhập số điện thoại"
                      tabIndex={2}
                      id="phone"
                      name="phone"
                      value={contact.phone || ""}
                      onChange={handleChange}
                      type="tel"
                      required
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Tiêu đề
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Nhập vấn đề của bạn"
                      tabIndex={2}
                      id="title"
                      name="title"
                      value={contact.title || ""}
                      onChange={handleChange}
                      type="text"
                      required
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-medium text-gray484"
                  >
                    Nội dung
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      value={contact.message || ""}
                      onChange={handleChange}
                      placeholder="Nhập nội dung cần liên hệ"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray484 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rede31"
                    ></textarea>
                  </div>
                </div>
                {success && (
                  <p className="text-xs font-light text-green-500">{success}</p>
                )}
                {error && (
                  <p className="text-xs font-light text-red-500">{error}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="uppercase text-lg font-bold text-white bg-rede31 min-w-[150px] py-2 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
