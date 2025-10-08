import React, { useState, useEffect } from "react";

import request from "../../../../utils/request";
import config from "../../../../utils/config";

function News() {
  const [news, setNews] = useState([]);
  const firstNew = news[0] || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("/news");
        setNews(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pt-20 md:pt-28">
      <section className="container max-w-defaultWidthLayout mx-auto py-6 px-3 md:px-0">
        <div className="flex flex-col md:flex-row items-center gap-x-8">
          <div className="hidden md:block md:w-2/5">
            <img
              className="w-full md:h-[300px] object-contain rounded"
              src={`${config.UPLOAD_URL}/${firstNew?.image}`}
              alt=""
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mt-2">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={require("../../../../assets/images/memberMale.png")}
                alt="member"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-rede31">Fast Food</p>
                <p className="text-sm text-gray484">{firstNew.created}</p>
              </div>
            </div>
            <h1 className="text-2xl h-16 line-clamp-2 uppercase font-bold text-black mt-2">
              {firstNew.title}
            </h1>
            <p className="text-base text-gray484 line-clamp-4 h-24 mt-3">
              {firstNew.description}
            </p>
            <button className="uppercase text-lg font-bold text-white bg-rede31 min-w-[150px] py-2 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out mt-8">
              Chi tiết
            </button>
          </div>
        </div>
      </section>
      <section className="container max-w-defaultWidthLayout mx-auto py-6 px-3 md:px-0">
        <h2 className="uppercase text-rede31 text-5xl font-bold text-center">
          Tin tức mới nhất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4 md:mt-8">
          {news.map((item) => (
            <div key={item.id} className="px-3 md:px-0">
              <div className="py-4 md:p-2 border rounded-sm">
                <img
                  className="w-full h-[175px] rounded object-contain"
                  src={`${config.UPLOAD_URL}/${item.image}` || ""}
                  alt="tintuc"
                />
                <h1 className="text-xl uppercase font-semibold text-black line-clamp-2 h-14 mt-2">
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
                    <p className="text-sm text-gray484">{firstNew.created}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="uppercase text-lg font-bold text-white bg-rede31 min-w-[180px] py-3 px-4 rounded-lg border border-rede31 hover:bg-transparent hover:text-rede31 transition-all ease-in-out">
            Xem thêm
          </button>
        </div>
      </section>
    </div>
  );
}

export default News;
