import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import FancyButton from "./FancyButton";
import Banner from "./Banner";

const Header = () => {
  const banner = "GRAND OPENING SALE - 20% OFF!";
  const [isMobile, setIsMobile] = useState();
  const [openMobile, setOpenMobile] = useState(false);

  const toggleMobileNav = () => {
    setOpenMobile(current => !current);
    return <MobileNav />;
  }

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
          <Banner link={"/contact"}>{banner}</Banner>
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
              <FancyButton link={"/dashboard"} isMobile={isMobile}>
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
                  onClick={() => toggleMobileNav()}
                />
              </div>
            </div>
            {openMobile && <MobileNavi />}
          </nav>
        </div>
      ) : (
        <div className="header">
          <Banner link={"/contact"}>{banner}</Banner>

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

const MobileNavi = () => {
  return (
    <div className="mobile-navigation" style={{zIndex: '999'}}>
      <Link to="/product" className="mobile-nav-link_item">
        Product
      </Link>
      <Link to="/pricing" className="mobile-nav-link_item">
        Pricing
      </Link>
    </div>
  );
};

export default Header;
