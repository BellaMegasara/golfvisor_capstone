import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box mb={3}>
        <img src="/src/assets/logo.png" alt="Logo" width={150} />
      </Box>

      <Typography variant="h1" fontWeight="bold">
        Oops! Swing and Miss!
      </Typography>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleGoHome}
          sx={{ bgcolor: "darkgreen", color: "white", mx: 1 }}
        >
          Go back to Home Course
        </Button>
        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{ bgcolor: "darkgreen", color: "white", mx: 1 }}
        >
          Take another shot
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
