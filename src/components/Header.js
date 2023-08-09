import React, { useContext } from "react";
import { LoginContext } from "./ContextProvider/Context";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import "./header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goError = () => {
    navigate("*");
  };

  const godash = () => {
    navigate("/dashboard");
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("https://resetpassword-bd.onrender.com/logout", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      localStorage.removeItem("usersdatatoken");
      setLoginData("");
      navigate("/");
    } else {
      navigate("*");
    }
  };

  return (
    <>
      <header className="bg-white">
        <nav>
          <h1
            className="text-xl font-semibold text-black"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Navigation Bar
          </h1>
          <div className="avtar">
            {loginData.validuserone ? (
              <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={handleClick}>
                {loginData.validuserone.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: "black" }}
                onClick={handleClick}
              />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.validuserone ? (
              <>
                <MenuItem
                  onClick={() => {
                    godash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logoutuser();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                {" "}
                <MenuItem
                  onClick={() => {
                    goError();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
