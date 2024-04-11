import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/products";
import GenerateStars from "./GenerateStars";
import { toast, Bounce } from "react-toastify";
import ProductDetails from "./ProductDetails";

const UserCard = ({ data }) => {
  const [detailsFlag, setDetailsFlag] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCart = () => {
    dispatch(addProduct(data));
    toast.success("Added to cart", {
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
      <div className="relative h-[450px] w-[280px] max-w-xs overflow-hidden rounded-lg bg-white shadow-md border-2 border-gray-400">
        <a href="#" onClick={() => setDetailsFlag((prevFlag) => !prevFlag)}>
          <img
            className="h-60 p-1 w-full rounded-t-lg object-contain"
            src={data.image}
            alt="product image"
          />
        </a>
        {data.category === "jewelery" ||
        data.category === "women's clothing" ? (
          <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
            Sale
          </span>
        ) : (
          ""
        )}
        <div className="mt-4 px-2 pb-5 ">
          <a href="#" onClick={() => setDetailsFlag((prevFlag) => !prevFlag)}>
            <h5 className="text-xl font-semibold tracking-tight text-slate-900">
              {data.title.substring(0, 22) + "..."}
            </h5>
          </a>
          <span
            className="text-sm max-w-[40ch] text-gray-400"
            onClick={() => setDetailsFlag((prevFlag) => !prevFlag)}
          >
            {data.description.substring(0, 60) + "..."}
          </span>
          <div className="mt-2.5 mb-5 flex items-center">
            <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {data.rating.rate}
            </span>
            <GenerateStars ratings={data.rating.rate} />
            <span className="text-sm text-gray-500 font-semibold pl-3">
              {data.rating.count}
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <p>
              <span className="text-xl font-bold text-slate-900">
                ${data.price}
              </span>
              <span className="text-sm relative left-2 text-gray-600 text-bold line-through">
                ${Math.floor(data.price + 20)}
              </span>
            </p>
            <a
              href="#"
              className="flex items-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a>
          </div>
        </div>
      </div>

      {detailsFlag ? (
        <ProductDetails
          data={data}
          setDetailsFlag={setDetailsFlag}
          detailsFlag={detailsFlag}
        />
      ) : null}
    </>
  );
};

export default UserCard;
