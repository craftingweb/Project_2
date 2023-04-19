import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const routes = ["home", "posts", "add"];
  return (
    <div>
      <ul className="bg-slate-800 text-white flex py-8 px-4 text-lg">
        {["Home", "Posts", "Add"].map((link, i) => {
          return (
            <li className="mr-6" key={i * Math.random()}>
              <NavLink
                to={
                  routes[i].toLowerCase() === "home"
                    ? "/"
                    : routes[i].toLowerCase()
                }
                className={({ isActive }) => (isActive ? "" : "text-slate-400")}
              >
                {link}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
