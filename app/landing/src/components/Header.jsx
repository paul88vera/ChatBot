import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import FancyButton from "./FancyButton";
import Banner from "./Banner";

const Header = () => {
  // const banner = "Clerk raises $50m Series C";
  const [isMobile, setIsMobile] = useState();
  const [openMobile, setOpenMobile] = useState(false);

  // mobile function to check if screen size is less than 568px
  const MobileNav = () => {
    if (window.innerWidth <= 947) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setOpenMobile(false);
    }
  };

  // checks the size of the screen to active the mobile navigation
  useEffect(() => {
    window.addEventListener("resize", MobileNav);
  });

  return (
    <>
      {isMobile ? (
        <div className="header">
          <Banner link={"/contact"}>ChatBox Christmas Sale - 20% OFF!</Banner>
          <nav className="header-nav header-nav_mobile">
            <div className="header-nav-links header-nav-links_mobile">
              <Link to="/" className="header-nav-logo mobile">
                ChatBox Inc.
              </Link>
            </div>
            <div className="header-nav-login header-nav-login_mobile mobile">
              <Link to="  /sign-in" className="header-nav-link_item">
                Sign in
              </Link>
              <FancyButton link={"  /dashboard"} isMobile={isMobile}>
                Get started
              </FancyButton>
              <div>
                <HiMenuAlt4
                  style={{
                    fontColor: "#000",
                    fontSize: "1.5rem",
                    fontWeight: "400s",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div className="header">
          <Banner link={"/contact"}>ChatBox Christmas Sale - 20% OFF!</Banner>

          <nav className="header-nav">
            <div className="header-nav-links">
              <Link to="/" className="header-nav-logo mobile">
                ChatBox Inc.
              </Link>
              <Link to="/product" className="header-nav-link_item">
                Product
              </Link>
              <Link to="/pricing" className="header-nav-link_item">
                Pricing
              </Link>
            </div>
            <div className="header-nav-login">
              <Link to="/sign-in" className="header-nav-link_item">
                Sign in
              </Link>
              <FancyButton link={"/dashboard"} isMobile={isMobile}>
                Get started
              </FancyButton>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
