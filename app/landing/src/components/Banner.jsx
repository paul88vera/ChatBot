import { Link } from "react-router-dom";

const Banner = ({ link, children }) => {
  if (children && link) {
    return (
      <Link className="header-banner" to={link}>
        {children}
      </Link>
    );
  } else {
    return
  }
};

export default Banner;
