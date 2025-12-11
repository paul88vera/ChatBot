import { Link } from "react-router-dom";

const Header = () => {
  const banner = "Clerk raises $50m Series C";

  return (
    <div className="header">
      {banner == "" || null ? null : (
        <Link className="header-banner" to="/contact">
          {banner}
        </Link>
      )}
      <nav className="header-nav">
        <div className="header-nav-links">
          <div className="header-nav-logo">
            <img alt="chatBox" />
          </div>
          <Link to="/product" className="header-nav-link_item">
            Product
          </Link>
          <Link to="/pricing" className="header-nav-link_item">
            Pricing
          </Link>
          <Link to="/about" className="header-nav-link_item">
            Company
          </Link>
        </div>
        <div className="header-nav-login">
          <Link to="/contact" className="header-nav-link_item">
            Sign in
          </Link>
          <Link to="/dashboard" className="header-nav-link_item_fancy">
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
