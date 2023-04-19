import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const routes = ["home", "posts", "add"];

  return (
    <div className="flex justify-between items-center p-4 border-t-2">
      <ul className=" text-slate-800 flex text-lg">
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

export default Footer;
