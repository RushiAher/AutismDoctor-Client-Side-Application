import React from "react";
import "./css/style.css";
import {useNavigate} from "react-router-dom"
const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className="error-page">
        <h1>404</h1>
        <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
        <p>
          THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME
          CHANGED OR IS TEMPORARLY UNAVAILABLE
        </p>
        <button className="btn btn-info" onClick={() => navigate("/")}>
          BACK TO HOMEPAGE
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
