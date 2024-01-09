import React from "react";
import heartRegularIcon from "../../assets/heart-regular.svg";
import "./HeartIcon.css";

const HeartRegularIcon = ({ onClick }) => {
  return (
    <div className="heart-icon-container">
      <img
        src={heartRegularIcon}
        alt="Heart Regular"
        className="heart-icon"
        onClick={onClick}
      />
    </div>
  );
};

export default HeartRegularIcon;
