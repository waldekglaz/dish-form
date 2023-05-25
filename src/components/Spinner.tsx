import React from "react";
import SpinnerImg from "../assets/master-chef.png";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div>
      <img className="spinner" src={SpinnerImg} alt="chefs hat" />
    </div>
  );
};

export default Spinner;
