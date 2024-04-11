import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination.jsx";
import axios from "axios";
import UserCard from "../components/UserCard.jsx";
import { useSelector } from "react-redux";
import Cart from "../components/Cart.jsx";
import "../App.css";
import Navbar from "../components/Navbar.jsx";

const HomePage = () => {
  const [totalPage, setTotalPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [cartFlag, setCartFlag] = useState(false);
  const [filterFlag, setFilterFlag] = useState(false);

  const [category, setCategory] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
  });

  const cart = useSelector((state) => state.cart);

  const onPageChange = async (page) => {
    setCurrentPage(page);
    page == 1
      ? setFilterData(products.slice(0, 10))
      : setFilterData(products.slice(10, 20));
  };

  const getData = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      setFilterData(data);
    } catch (error) {
      alert(error);
    }
  };

  const hanldeSearch = async (e) => {
    let term = e.target.value;
    setSearchTerm(term);
    const updatedData = products.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilterData(updatedData);
    setTotalPage(Math.floor(products / updatedData) / 10);
  };

  const applyFilters = async () => {
    const hasActiveFilters = selectedFilters.category.length > 0;

    if (hasActiveFilters) {
      const updatedData = products.filter((user) => {
        const filteredCategory =
          selectedFilters.category.length === 0 ||
          selectedFilters.category.includes(user.category);

        return filteredCategory;
      });

      setFilterData(updatedData);
    } else {
      setFilterData(products);
      setTotalPage(2);
    }
  };

  const handleBoxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else updatedFilters[category] = [...updatedFilters[category], value];
      return updatedFilters;
    });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  useEffect(() => {
    const uniqueCategory = [...new Set(products?.map((item) => item.category))];

    setCategory(uniqueCategory);
  }, [products]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar
        setFilterFlag={setFilterFlag}
        hanldeSearch={hanldeSearch}
        setCartFlag={setCartFlag}
        searchTerm={searchTerm}
      />
      <div className="flex max-w-[1440px] mt-10 md:mt-10">
        <div
          className={`${
            filterFlag ? "filters-section" : "filter-close"
          }  border border-gray-700 w-2/3 md:w-1/5  flex flex-col justify-start py-5 bg-gray-700 text-white `}
        >
          <button
            onClick={() => setFilterFlag((prevFlag) => !prevFlag)}
            className="w-10 bg-red-700 text-white text-xl  sm:block md:hidden absolute right-0 top-6"
          >
            X
          </button>
          <h2 className="font-semibold text-start text-2xl my-2 pl-4 pt-10">
            FILTERS
          </h2>
          {category &&
            category.map((item) => {
              return (
                <div className="pl-3">
                  <input
                    type="checkbox"
                    id={`category-${item}`}
                    checked={selectedFilters.category.includes(item)}
                    onChange={() => handleBoxChange("category", item)}
                    className="w-[16px] h-[16px] cursor-pointer"
                  />
                  <label
                    htmlFor={`category-${item}`}
                    className="pl-2 text-lg text-white cursor-pointer"
                  >
                    {item.substring(0, 1).toUpperCase() +
                      item.substring(1, item.length)}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="w-full sm:w-5/6">
          <div className="flex gap-2 flex-wrap items-center justify-center w-full  mt-12">
            {filterData && filterData.length > 0
              ? filterData.slice(0, 10).map((item, index) => {
                  return <UserCard key={index} data={item} />;
                })
              : "No Item Found"}
          </div>
        </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={onPageChange}
        />
      </div>

      <Cart setCartFlag={setCartFlag} cartFlag={cartFlag} getData={getData} />
    </>
  );
};

export default HomePage;
