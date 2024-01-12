import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li className="menu-left">Weight and Fitness Tracker</li>
        <span className="menu-right">
          <li> <NavLink to={"/profile"} className={({isActive}) =>
    isActive ? "active" : "inactive"}> Profile </NavLink></li>
          <li><NavLink to={"/weight"} className={({isActive}) =>
    isActive ? "active" : "inactive"}>Weight</NavLink>  </li>
          <li><NavLink to={"/fitness"} className={({isActive}) =>
    isActive ? "active" : "inactive"}>Fitness</NavLink>  </li>
          <li>Nutrition</li>
          <li> <NavLink to={"/login"} className={({isActive}) =>
    isActive ? "active" : "inactive"}>Log in</NavLink>  </li>
        </span>
      </ul>
    </nav>
  );
}

export default Navbar;