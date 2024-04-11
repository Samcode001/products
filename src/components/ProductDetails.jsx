import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenerateStars from "./GenerateStars";
import { toast, Bounce } from "react-toastify";
import { addProduct } from "../redux/products";
import { IoCloseSharp } from "react-icons/io5";

const ProductDetails = ({ data, setDetailsFlag, detailsFlag }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const productRef = useRef();

  const handleClickOutside = (event) => {
    if (productRef.current && !productRef.current.contains(event.target)) {
      setDetailsFlag(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div
        className={`fixed w-2/3 md:w-1/2 h-3/4 md:h-[400px] ${
          detailsFlag
            ? "top-[10%] md:top-[20%] opacity-100"
            : " top-[-100rem] opacity-0"
        } left-[10%] md:left-[25%] rounded-xl  shadow-[0px_0px_100em_200px_rgba(0,0,0,0.4)] overflow-scroll overflow-x-hidden pt-7 px-5 bg-white border border-gray-700 z-50 flex flex-col md:flex-row gap-2 transition-all duration-300 ease-in-out`}
      >
        <IoCloseSharp
          className="absolute top-2 right-4 cursor-pointer"
          size={40}
          color="marron"
          onClick={() => setDetailsFlag((prevFlag) => !prevFlag)}
        />
        <div className="w-1/3" ref={productRef}>
          <a href="#">
            <img
              className=" rounded-t-lg object-contain  border-lime-700"
              src={data.image}
              alt="product image"
            />
          </a>
        </div>
        <div className="w-full  md:w-2/3 p-1 md:p-3">
          <div className="mt-4 px-2 pb-5 ">
            <div className="mt-2.5 mb-5 flex items-center">
              <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {data.rating.rate}
              </span>
              <GenerateStars ratings={data.rating.rate} />
              <span className="text-sm text-gray-500 font-semibold pl-3">
                {data.rating.count}
              </span>
            </div>
            <a href="#">
              <h5
                className="text-2xl font-semibold tracking-tight text-slate-900"
                ref={productRef}
              >
                {data.title}
              </h5>
            </a>
            <span
              className="text-base max-w-[40ch] text-gray-400"
              ref={productRef}
            >
              {data.description}
            </span>

            <div className="flex items-center justify-between mt-10 ">
              <p>
                <span className=" text-xl md:text-3xl font-bold text-slate-900">
                  ${data.price}
                </span>
                <span className="text-sm md:text-xl relative left-2 text-gray-600 text-bold line-through">
                  ${Math.floor(data.price + 20)}
                </span>
              </p>
              <a
                href="#"
                className="flex items-center rounded-md bg-slate-900 px-2 md:px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
      </div>
    </>
  );
};

export default ProductDetails;
