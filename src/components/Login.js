import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordType, setPasswordType] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const loginUser = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      alert("Empty fields are not allowed!!");
    } else if (email === "") {
      alert("Please enter Email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Enter password");
    } else {
      const data = await fetch("https://resetpassword-bd.onrender.com/login", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const response = await data.json();
      //    console.log(response);
      if (response.status === 200) {
        localStorage.setItem("usersdatatoken", response.result.token);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast(response.error);
        setEmail("");
        setPassword("");
      }
    }
  };
  return (
    <>
      <div className="page flex flex-col items-center p-4">
        <form
          className=" bg-white rounded p-4"
          style={{ boxShadow: "0 0 10px grey" }}
        >
          <h1 className="text-2xl font-semibold mb text-center mb-3 rounded">
            Login Form
          </h1>
          <div className="">
            <input
              type="email"
              className="p-2 border rounded w-full mb-1"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter Email"
            />
            <div className="text-blue-400 text-sm">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="">
            <div className="flex mt-3">
              <input
                type={passwordType}
                className="p-2 border rounded w-full items-center justify-center mb-3 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                id="password"
              />
              <div className="mb-3">
                <button
                  className="p-2 border rounded w-full"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="fa-solid fa-eye-slash text-black"></i>
                  ) : (
                    <i className="fa-solid fa-eye text-black  "></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded w-full text-white p-2"
            onClick={loginUser}
          >
            Log in
          </button>
          <p className="text-sm mt-2 text-center">
            Don't have an account?<NavLink to={"/register"}> Sign Up</NavLink>
          </p>
          <p
            className="text-sm mt-2 text-center"
            style={{ fontWeight: "bold" }}
          >
            Forgot Password?
            <NavLink to={"/password-reset"}> Click Here</NavLink>
          </p>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
