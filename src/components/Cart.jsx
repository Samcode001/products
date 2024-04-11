import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart, removeProduct } from "../redux/products";
import GenerateStars from "./GenerateStars";
import { toast, Bounce } from "react-toastify";

const Cart = ({ setCartFlag, cartFlag, getData }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const cartRef = useRef();

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartFlag(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemove = (item) => {
    dispatch(removeProduct(item));
    toast.success("Item Removed", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <div
        className={`md:w-1/3 h-full p-3 fixed top-0 w-5/6 ${
          cartFlag ? "right-0 opacity-100" : "right-[-50rem] opacity-0"
        } 
         bg-white z-50 transition-all duration-300 ease-in-out shadow-[0px_0px_100em_500px_rgba(0,0,0,0.4)]`}
        ref={cartRef}
      >
        <button
          onClick={() => setCartFlag((prevFlag) => !prevFlag)}
          className=" bg-transparent text-red-900 text-2xl w-fit absolute top-1 right-4 my-3 py-1 px-2 rounded-2xl font-bold  hover:bg-red-500 hover:text-white"
        >
          X
        </button>
        <h2 className="text-3xl font-bold border-b border-black my-2">
          Team Members
        </h2>
        <div className="h-4/5 overflow-y-scroll border-b border-gray-800">
          {cart.length > 0
            ? cart.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex border border-gray-700 px-4 py-2 my-1 relative shadow-lg rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt="img"
                      className="w-1/3 object-contain p-2"
                    />
                    <div className="flex flex-col pl-3">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {item.title.substring(0, 20)}
                      </h1>
                      <div className="my-2 flex items-center">
                        <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          {item.rating.rate}
                        </span>
                        <GenerateStars ratings={item.rating.rate} />
                      </div>
                      <span>{item.description.substring(0, 40) + "..."}</span>
                      <div className="flex items-center mt-4 text-gray-700">
                        <span className="text-xl font-bold text-slate-900">
                          ${item.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemove(item)}
                        className="border border-black bg-red-600 text-white w-fit  top-1 right-4 my-2 py-1 px-2 rounded-2xl font-bold hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            : "Add Items"}
        </div>
        <div className="flex gap-3  my-2 pl-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
