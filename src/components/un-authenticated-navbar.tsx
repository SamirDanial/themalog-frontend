import React from "react";
import { Link } from "react-router-dom";
import Thermalog_Logo from "../asset/ThermaLandscape.webp";

export const UnAuthenticatedNavbar: React.FC = () => {
  return (
    <nav className="bg-softgreen-10 h-[84px]">
      <ul className="flex flex-row justify-center ml-[20px] sm:ml-0 sm:justify-start gap-[20px] h-full items-center text-[20px] font-bold text-midgrey-10">
        <li className="ml-4 mr-8 hidden sm:block">
          <Link to="/">
            <img
              src={Thermalog_Logo}
              alt="Thermalog Logo"
              className="h-[60px] w-auto"
            />
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/details/1">Details</Link>
        </li>
        <li className="ml-auto mr-[20px]">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
