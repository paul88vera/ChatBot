import React from "react";
import {
  Outlet,
  ScrollRestoration,
} from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DashboardLayout = () => {

  return (
    <>
      <ScrollRestoration />
        <div className="container">
          <Header />
          <Outlet />
          <Footer />
        </div>
    </>
  );
};

export default React.memo(DashboardLayout);
