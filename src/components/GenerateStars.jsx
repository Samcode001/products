import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const GenerateStars = ({ ratings, size }) => {
  const IntegerRate = Math.floor(ratings);
  let decimal = ratings - IntegerRate;

  const ratingCount = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= IntegerRate)
        stars.push(<FaStar color="rgb(253 239 137)" size={20} />);
      else if (decimal >= 0.5) {
        stars.push(<FaStarHalfAlt color="rgb(253 239 137)" size={20} />);
        decimal = 0;
      } else stars.push(<FaRegStar color="gray" size={20} />);
    }
    return stars;
  };

  return (
    <div className="flex gap-1 items-center justify-center">
      {ratingCount()}
    </div>
  );
};

export default GenerateStars;
