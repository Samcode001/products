import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = ({ setFilterFlag, setCartFlag, hanldeSearch, searchTerm }) => {
  const cart = useSelector((state) => state.cart);

  const [menuFlag, setMenuFlag] = useState(false);
  return (
    <>
      <div className="fixed top-0 right-0 w-full bg-white z-40 flex justify-between items-center px-5 py-3">
        <div>
          <h1 className="font-bold text-3xl pl-2 md:pl-5 text-gray-800">
            E-SHOP
          </h1>
        </div>

        <div
          className={`${
            !menuFlag
              ? "top-[-100rem] opacity-0"
              : " opacity-100  top-12 left-0"
          } flex md:opacity-100 items-center gap-4 md:top-0 md:left-0 flex-col-reverse md:flex-row px-10 py-1 absolute md:relative bg-white transition-all duration-300 ease-in-out`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => hanldeSearch(e)}
            placeholder="Search"
            className="py-3 px-4 block w-[300px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          />
          <button
            onClick={() => setCartFlag((prevFlag) => !prevFlag)}
            className="relative bg-gray-700 hover:bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded"
          >
            <FaShoppingCart />
            <span className="absolute right-1 top-0 bg-red-900 text-white rounded-full text-sm ">
              {cart.length}
              {/* {console.log(cartFlag)} */}
            </span>
          </button>
        </div>
        <div className="md:hidden ">
          <button
            onClick={() => setFilterFlag((prevFlag) => !prevFlag)}
            className="text-blue-900"
          >
            <FaFilter size={25} color="#0f172a" className="relative bottom-1" />
          </button>
          <button onClick={() => setMenuFlag((prevFlag) => !prevFlag)}>
            {menuFlag ? (
              <IoCloseSharp
                size={35}
                className="border border-gray-900 rounded-md mx-2"
              />
            ) : (
              <RxHamburgerMenu
                size={30}
                className="border border-gray-900 rounded-md mx-2"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
