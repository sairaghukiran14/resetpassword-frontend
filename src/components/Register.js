import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");
  let [passwordType, setPasswordType] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const addUserData = async (e) => {
    e.preventDefault();

    if (name === "" && email === "" && password === "" && cpassword === "") {
      alert("Empty fields are not allowed!!!");
    } else if (name === "") {
      alert("Please enter your Name");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Please enter your Password");
    } else if (cpassword === "") {
      alert("Please enter confirm password");
    } else if (password !== cpassword) {
      alert("password doesn't match");
    } else {
      const data = await fetch(
        "https://resetpassword-bd.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword,
          }),
        }
      );
      const response = await data.json();
      console.log(response);
      if (response.status === 200) {
        toast("user registration done");
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } else {
        toast("user already exists!!");
        setName("");
        setPassword("");
        setCpassword("");
        setEmail("");
      }
    }
  };
  return (
    <>
      <div className="page flex flex-col items-center p-4 ">
        <form
          className=" bg-white rounded p-4 w-96"
          style={{ boxShadow: "0 0 10px grey" }}
        >
          <h1 className="text-2xl font-semibold text-center mb-3 rounded">
            Sign Up
          </h1>{" "}
          <div className="mb-3">
            <input
              type="text"
              className="p-2 border rounded w-full mb-1"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="p-2 border rounded w-full mb-1"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="">
            <div className="flex">
              <input
                type={passwordType}
                className="p-2 border rounded w-full items-center justify-center mb-3 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                id="password"
              />
              <div className="flex">
                <button
                  className="p-2 border rounded w-full h-3/4"
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
          <div className="mb-3">
            <input
              type="password"
              className="p-2 border rounded w-full"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Confirm password"
              id="cpassword"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 rounded p-2 w-full text-white"
              onClick={addUserData}
            >
              Sign Up
            </button>
            <p className="text-sm mt-2">
              Already have an account?
              <NavLink to={"/"}> {<b>Log In</b>} </NavLink>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
export default Register;
