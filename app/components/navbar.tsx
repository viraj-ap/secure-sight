import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-[#151515] p-6 border-b border-[#373737] border-opacity-50">
      <div>
        <img className = "cursor-pointer" src="/logo.png" alt="" />
      </div>

    <div className="relative flex-1 mx-8">
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[80%] h-16 bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full blur-2xl opacity-20 pointer-events-none"></div>

      <ul className="flex justify-center gap-10 items-center relative z-10 text-white text-sm font-sans font-bold">
        <li className="flex items-center gap-2 cursor-pointer hover:translate-y-[-5px] transtion-all duration-300">
        <img
          src="/mdi_view-dashboard.png"
          alt="Dashboard"
          className="w-5 h-5"
        />
        Dashboard
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:translate-y-[-5px] transtion-all duration-300">
        <img src="/bxs_cctv.png" alt="Cameras" className="w-5 h-5" />
        Cameras
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:translate-y-[-5px] transtion-all duration-300">
        <img
          src="/material-symbols_settings-applications.png"
          alt="Scenes"
          className="w-5 h-5"
        />
        Scenes
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:translate-y-[-5px] transtion-all duration-300">
        <img src="/ri_alert-fill.png" alt="Incidents" className="w-5 h-5" />
        Incidents
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:translate-y-[-5px] transtion-all duration-300">
        <img src="/mdi_users.png" alt="Users" className="w-5 h-5" />
        Users
        </li>
      </ul>
    </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10">
          <img
            src="/Avatar.png"
            alt="User avatar"
            className="rounded-full w-full h-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Mohammed Ajhas</p>
          <p className="text-xs text-gray-400">ajhas@mandlac.com</p>
        </div>
        <div className="ml-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
