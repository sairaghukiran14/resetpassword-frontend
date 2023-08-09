import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState(false);
  const sendLink = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://resetpassword-bd.onrender.com/sendpasswordlink",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    let data = await res.json();
    console.log(data);
    if (data.status === 200) {
      setEmail("");
      setMessage(true);
    } else {
      toast("invalid user");
    }
  };

  return (
    <>
      <div className="page flex flex-col items-center p-4">
        <form
          className=" bg-white rounded p-4"
          style={{ boxShadow: "0 0 8px grey" }}
        >
          <h2 className="text-2xl font-semibold text-center mb-3 rounded">
            Enter Your Email Address
          </h2>
          {message ? (
            <p className="text-success" style={{ fontWeight: "bold" }}>
              Resent Link sent successfully in Your email
            </p>
          ) : (
            ""
          )}
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

          <button
            type="submit"
            className="bg-blue-500 rounded w-full text-white p-2"
            onClick={sendLink}
          >
            Send{" "}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PasswordReset;
