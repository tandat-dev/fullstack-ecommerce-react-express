import React, { useState } from "react";
import Header from "../../LayoutAdmin/components/Header";
import Navigation from "../../LayoutAdmin/components/Navigation";

function DefaultLayout({ children }) {
  const [isShowNavigation, setIsShowNavigation] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Navigation */}
      <div
        className={`transition-transform duration-300 fixed top-0 bottom-0 left-0 ${
          isShowNavigation ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isShowNavigation && <Navigation />}
      </div>
      {/* Main */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isShowNavigation ? "ml-72" : "ml-0"
        } p-6`}
      >
        {/* Header */}
        <Header
          toggleNavigation={() => setIsShowNavigation(!isShowNavigation)}
        />
        {/* Content */}
        <div className="px-3">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
