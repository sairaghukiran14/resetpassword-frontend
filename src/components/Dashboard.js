import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  let [data, setData] = useState(false);
  let navigate = useNavigate();

  const Dashboardvalid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("https://resetpassword-bd.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 401 || data.status === 400 || !data) {
      navigate("*");
    } else {
      setLoginData(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Dashboardvalid();
      setData(true);
    }, 1500);
  }, []);

  return (
    <>
      {data ? (
        <div>
          <h1 className="dashboard flex justify-center pt-8 text-3xl font-semibold h-full text-white">
            Welcome {loginData ? loginData.validuserone.name : ""}
          </h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
