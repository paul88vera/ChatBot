import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

const FancyButton = ({link, isMobile, children}) => {
  const [hoveredArrow, setHoveredArrow] = useState("#ffffff");

  return (
    <Link to={link} className={isMobile ? "header-nav-link_item_fancy_mobile" : "header-nav-link_item_fancy"} onMouseEnter={() => {
      setHoveredArrow('rgba(255, 255, 255, 0.656)')
    }} onMouseLeave={() => {
      setHoveredArrow('#ffffff')
    }}> {children}
    <IoMdArrowDropright style={{fontSize: '1rem', marginTop: '.1rem', color: `${hoveredArrow}`}} />
    </Link>
  )
}

export default FancyButton
