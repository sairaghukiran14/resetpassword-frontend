import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center pt-5">
      <h1 className="text-red-400">Page Not Found!!!!</h1>
      <p>
        <NavLink to={"/"}> Back to Home page</NavLink>{" "}
      </p>
    </div>
  );
};

export default Error;
