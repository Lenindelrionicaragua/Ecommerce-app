import React from "react";
import heartSolidIcon from "../../assets/heart-solid.svg";
import "./HeartIcon.css";

const HeartSolidIcon = ({ onClick }) => {
  return (
    <div className="heart-icon-container">
      <img
        src={heartSolidIcon}
        alt="Heart Solid"
        className="heart-icon"
        onClick={onClick}
      />
    </div>
  );
};

export default HeartSolidIcon;
