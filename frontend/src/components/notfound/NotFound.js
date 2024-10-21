// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/NotFound.css";
import notfoundbear from "../../assets/notfound-bear.png";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="error-404">
        <h1 className="animated-bounce">404</h1>
      </div>
      <p className="error-message">
        Oops! It looks like you are lost. Let the bear help you find your way.
      </p>
      <div className="notfoundbear">
        <img
          src={notfoundbear}
          alt="Not Found Bear"
          className="notfoundbear-img"
        />
      </div>
      <Link to="/" className="back-home">
        Take me home
      </Link>
    </div>
  );
};

export default NotFound;
