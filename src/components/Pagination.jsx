import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(2); // Initial end page

  const handlePageChange = async (page) => {
    if (page < startPage || page > endPage) {
      const diff = Math.floor((endPage - startPage) / 2);
      setStartPage(page - diff);
      setEndPage(page + diff);
    }
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-center gap-6 border-t border-gray-200 ">
        {startPage > 1 && (
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={() => handlePageChange(startPage - 1)}
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
          </div>
        )}

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isCurrentPage = pageNumber === currentPage;
          const isInRange = pageNumber >= startPage && pageNumber <= endPage;

          if (pageNumber === 1 || pageNumber === totalPages || isInRange) {
            return (
              <p
                key={index}
                className={
                  isCurrentPage
                    ? "text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2"
                    : "text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
                }
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </p>
            );
          } else if (pageNumber === endPage + 1) {
            return (
              <p
                key={index}
                className="text-sm font-medium leading-none cursor-pointer text-gray-600 pt-3 mr-4 px-2"
              >
                ...
              </p>
            );
          }
          return null;
        })}
        {endPage < totalPages && (
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={() => handlePageChange(endPage + 1)}
          >
            <p className="text-sm font-medium leading-none mr-3">Next</p>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
