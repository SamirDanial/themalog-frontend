import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Import Zustand store
import Thermalog_Logo from "../asset/ThermaLandscape.webp";

export const AuthenticatedNavbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout); // Access logout action

  return (
    <nav className="bg-blue-300 h-[84px]">
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
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="ml-auto mr-[20px]">
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
