import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/logo.png";
import { Box, Button, Typography } from "@mui/material";
import Signin from "./Signin";

const Navbar: React.FC = () => {
  const [signinPopup, setSigninPopup] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOpenSigninPopUp = () => {
    setSigninPopup(true);
  };

  const handleCloseSigninPopUp = () => {
    setSigninPopup(false);
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the main page (adjust path if necessary)
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 4,
          py: 2,
          backgroundColor: "#fff",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <img
          src={logo}
          className="w-16 h-16"
          alt="Logo"
          style={{ marginRight: "8px", cursor: "pointer" }} // Add cursor pointer
          onClick={handleLogoClick} // Add onClick event
        />

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            margin: 0,
          }}
        >
          Golfvisor
        </Typography>

        <Button
          onClick={handleOpenSigninPopUp}
          variant="contained"
          color="success"
          sx={{
            borderRadius: "60px",
            px: 2,
            py: 2,
            mt: 4.2,
          }}
        >
          Sign in
        </Button>
      </Box>

      <Signin open={signinPopup} handleClose={handleCloseSigninPopUp} />
    </>
  );
};

export default Navbar;
