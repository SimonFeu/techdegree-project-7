import React from "react";
import { NavLink } from "react-router-dom";

//Creates a Nav-Element with "NavLinks" to show which link is currently active
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/beach">Beach</NavLink>
        </li>
        <li>
          <NavLink to="/mountains">Mountains</NavLink>
        </li>
        <li>
          <NavLink to="/forest">Forest</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
