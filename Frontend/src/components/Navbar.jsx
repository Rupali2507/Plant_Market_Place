import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setToken,
    setShowSearch,
    getCartCount,
    token,
    setCartItem,
    navigate,
  } = useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/login");
  };

  return (
    <>
      <div className="  flex items-center justify-between font-medium py-5  ">
        {/* LOGO */}
        <Link to={"/"} className="  w-20 max-h-10 ml-10">
          <img src={assets.logo} alt="" />
        </Link>
        {/* Nav pages */}
        <ul className="  text-green-900 hidden sm:flex gap-5 text-md mt-10  ">
          <NavLink to={"/"} className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr
              className="w-3/4 hidden border-none h-[1.5px]
          bg-black"
            />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr
              className="w-3/4 hidden border-none h-[1.5px]
          bg-black"
            />
          </NavLink>
          <NavLink
            to={"/consultation"}
            className="flex flex-col items-center gap-1"
          >
            <p>CONSULTATION</p>
            <hr className="w-3/4 hidden bg-black border-none h-[1.5px]" />
          </NavLink>
          <NavLink to={"/about"} className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-3/4 hidden bg-black border-none h-[1.5px]" />
          </NavLink>
          <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className=" hidden w-3/4 bg-black border-none h-[1.5px]" />
          </NavLink>
        </ul>
        {/* right icons */}

        <div className="flex items-center gap-6 mt-10">
          {/* Search */}
          <img
            onClick={() => setShowSearch(true)}
            className="w-5 cursor-pointer "
            src={assets.search_icon}
            alt=""
          />
          {/* Profile */}
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt=""
            />
            {/* Dropdown */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col  rounded-md gap-1 w-36 py-2 px-4 bg-green-900 text-black">
                  <p
                    className="cursor-pointer
                bg-green-900 text-white  hover:text-gray-400"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer bg-green-900 text-white border-y-2
                border-black hover:text-gray-400"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer
                bg-green-900 text-white  hover:text-gray-400 flex justify-start"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Cart */}
          <Link to={"/cart"}>
            <div className="relative mr-3">
              <img
                className="w-5 cursor-pointer"
                src={assets.cart_icon}
                alt=""
              />
              <div className="absolute w-4 leading-4 bg-green-900 rounded-full text-white text-center text-[8px] right-[-5px] bottom-[-5px] ">
                {getCartCount()}
              </div>
            </div>
          </Link>
          {/* menu bar */}

          <img
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt=""
          />
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col  text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex  hover:bg-green-900  items-center gap-4 p-3 hover:text-white cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="rotate-180 h-4 hover:bg-green-900 "
                alt=""
              />
              Back
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border hover:bg-green-900 hover:text-white "
              to={"/"}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border hover:bg-green-900 hover:text-white "
              to={"/collection"}
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border hover:bg-green-900 hover:text-white "
              to={"/consultation"}
            >
              CONSULTATION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border  hover:bg-green-900 hover:text-white "
              to={"/about"}
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border  hover:bg-green-900 hover:text-white "
              to={"/contact"}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
      <hr className="mt-4 bg-green-900 border-green-900" />
    </>
  );
};

export default Navbar;
