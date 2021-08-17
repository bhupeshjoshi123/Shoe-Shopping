import React from "react";
import {Link, NavLink} from "react-router-dom";
const activeStyle = {
  color: "purple",
};
export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to = "/"><img alt="Carved Rock Fitness" src="/images/logo.png" /></Link>
          </li>
           <li>
          <Link to = "/shoes">
          Shoes
          </Link>
          </li>
          <li>
        <NavLink activeStyle = {activeStyle} to = "/cart">
          CART
        </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
