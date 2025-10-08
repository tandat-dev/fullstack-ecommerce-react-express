import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import routes from "../../../../config/routes";

import request from "../../../../utils/request";
function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);

  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + "T";
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getYearMonth = () => {
    const date = new Date();
    const dateString = date.toISOString();
    return dateString.slice(0, 7);
  };

  const yearMonth = getYearMonth();
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await request.get("/chart", {
          params: { yearMonth },
        });
        setChartData(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartData();
  }, [yearMonth]);

  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const fetchMonthEarnings = async () => {
      try {
        const res = await request.get("/monthlyEarnings", {
          params: { year: currentYear },
        });
        setMonthlyEarnings(res.data.monthlyEarnings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMonthEarnings();
  }, [currentYear]);

  useEffect(() => {
    if (!chartData) return;

    const { views, sales, contacts } = chartData;

    const dataObj = {
      views: isNaN(parseInt(views, 10)) ? 0 : parseInt(views, 10),
      sales: isNaN(parseInt(sales, 10)) ? 0 : parseInt(sales, 10),
      contacts: isNaN(parseInt(contacts, 10)) ? 0 : parseInt(contacts, 10),
    };
    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
    if (window.earningChart instanceof Chart) {
      window.earningChart.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    window.myChart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Views", "Sales", "Contacts"],
        datasets: [
          {
            label: "Traffic Source",
            data: [dataObj.views, dataObj.sales, dataObj.contacts],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Create Bar Chart
    const earningCtx = document.getElementById("earning").getContext("2d");
    window.earningChart = new Chart(earningCtx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Earning",
            data: monthlyEarnings,
            backgroundColor: ["rgba(227, 24, 55, 1)"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, [chartData, monthlyEarnings]);

  return (
    <section className="container mx-auto">
      <div className="flex items-center justify-between">
        <nav>
          <ul className="flex gap-x-3 items-center">
            <li className="text-gray484 opacity-50 font-extralight text-base">
              <Link to={routes.dashboard}>Home</Link>
            </li>
            <li>/</li>
            <li className="font-extralight text-base">
              <Link to={routes.dashboard}>Dashboard</Link>
            </li>
          </ul>
          <ul>
            <li className="text-2xl font-bold">
              <Link to={routes.dashboard}>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div
          id="Card"
          className="bg-white p-8 group rounded-3xl flex justify-between cursor-pointer shadow-md transition-all hover:bg-blue-500"
        >
          <div>
            <h1 className="font-bold text-4xl text-blue-500 group-hover:text-white">
              {chartData ? chartData.views : 0}
            </h1>
            <p className="text-gray484 text-lg mt-1 group-hover:text-white">
              Daily Views
            </p>
          </div>
          <div>
            <ion-icon
              class="size-14 text-gray484 group-hover:text-white md hydrated"
              name="eye-outline"
              role="img"
            ></ion-icon>
          </div>
        </div>
        <div
          id="Card"
          className="bg-white p-8 group rounded-3xl flex justify-between cursor-pointer shadow-md transition-all hover:bg-blue-500"
        >
          <div>
            <h1 className="font-bold text-4xl text-blue-500 group-hover:text-white">
              {chartData ? chartData.sales : 0}
            </h1>
            <p className="text-gray484 text-lg mt-1 group-hover:text-white">
              Sales
            </p>
          </div>
          <div>
            <ion-icon
              class="size-14 text-gray484 group-hover:text-white md hydrated"
              name="cart-outline"
              role="img"
            ></ion-icon>
          </div>
        </div>
        <div
          id="Card"
          className="bg-white p-8 group rounded-3xl flex justify-between cursor-pointer shadow-md transition-all hover:bg-blue-500"
        >
          <div>
            <h1 className="font-bold text-4xl text-blue-500 group-hover:text-white">
              {chartData ? chartData.contacts : 0}
            </h1>
            <p className="text-gray484 text-lg mt-1 group-hover:text-white">
              Contacts
            </p>
          </div>
          <div>
            <ion-icon
              class="size-14 text-gray484 group-hover:text-white md hydrated"
              name="document-text-outline"
              role="img"
            ></ion-icon>
          </div>
        </div>
        <div
          id="Card"
          className="bg-white p-8 group rounded-3xl flex justify-between cursor-pointer shadow-md transition-all hover:bg-blue-500"
        >
          <div>
            <h1 className="font-bold text-4xl text-blue-500 group-hover:text-white">
              {chartData ? formatNumber(chartData.earning) : 0}
            </h1>
            <p className="text-gray484 text-lg mt-1 group-hover:text-white">
              Earning
            </p>
          </div>
          <div>
            <ion-icon
              class="size-14 text-gray484 group-hover:text-white md hydrated"
              name="cash-outline"
              role="img"
            ></ion-icon>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="grid grid-cols-6 gap-6 mt-8">
        <div className="col-span-2 bg-white p-6 shadow-lg rounded-sm">
          <canvas
            id="myChart"
            width="413"
            height="412"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "329.6px",
              width: "330.4px",
            }}
          ></canvas>
        </div>
        <div className="col-span-4 bg-white p-6 shadow-lg rounded-sm">
          <canvas
            id="earning"
            width="916"
            height="457"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "365.6px",
              width: "732.8px",
            }}
          ></canvas>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
