import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import FancyButton from "./FancyButton";
import Banner from "./Banner";

const MOBILE_BREAKPOINT = 947;

const Header = () => {
  const banner = "GRAND OPENING SALE - 20% OFF!";

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [openMobile, setOpenMobile] = useState(false);

  // Handle resize properly
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // Auto-close mobile menu when switching to desktop
      if (!mobile) setOpenMobile(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileNav = () => {
    setOpenMobile(prev => !prev);
  };


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
      <Link to="/" className="mobile-nav-link_item" onClick={() => toggleMobileNav()}>
        Home
      </Link>
      <Link to="/product" className="mobile-nav-link_item" onClick={() => toggleMobileNav()}>
        Product
      </Link>
      <Link to="/pricing" className="mobile-nav-link_item" onClick={() => toggleMobileNav()}>
        Pricing
      </Link>
    </div>
  );
};

export default Header;
